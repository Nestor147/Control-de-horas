using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Helpers.EmailService
{
    public class EncryptionHelper
    {
        //  SHA256
        private static byte[] GetEncryptionKey(string key)
        {
            using (SHA256 sha = SHA256.Create())
            {
                return sha.ComputeHash(Encoding.UTF8.GetBytes(key));
            }
        }

        public static string Encrypt(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
                return null;

            byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
            byte[] keyBytes = GetEncryptionKey("TimeSheet-IATEC-BO-IGLESIA-ADVENTISTA-SEPTIMO-DIA");

            using (Aes aes = Aes.Create())
            {
                aes.Key = keyBytes;
                aes.GenerateIV(); 
                byte[] iv = aes.IV;

                using (var encryptor = aes.CreateEncryptor(aes.Key, iv))
                {
                    byte[] encrypted = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

            
                    byte[] combinedIvAndCipherText = new byte[iv.Length + encrypted.Length];
                    Array.Copy(iv, 0, combinedIvAndCipherText, 0, iv.Length);
                    Array.Copy(encrypted, 0, combinedIvAndCipherText, iv.Length, encrypted.Length);

      
                    return Convert.ToBase64String(combinedIvAndCipherText);
                }
            }
        }
        public static string Decrypt(string encryptedText)
        {
            if (string.IsNullOrEmpty(encryptedText))
                return null;

            byte[] cipherBytes = Convert.FromBase64String(encryptedText);
            byte[] keyBytes = GetEncryptionKey("TimeSheet-IATEC-BO-IGLESIA-ADVENTISTA-SEPTIMO-DIA");

            using (Aes aes = Aes.Create())
            {
                aes.Key = keyBytes;

                byte[] iv = new byte[aes.BlockSize / 8];
                byte[] cipherText = new byte[cipherBytes.Length - iv.Length];
                Array.Copy(cipherBytes, iv, iv.Length);
                Array.Copy(cipherBytes, iv.Length, cipherText, 0, cipherText.Length);

                aes.IV = iv;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    byte[] decrypted = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                    return Encoding.UTF8.GetString(decrypted);
                }
            }
        }
    }

}
