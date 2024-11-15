using System.Globalization;
using System.Text.RegularExpressions;
using Timesheet.Business.Exceptions;

namespace Timesheet.Api.Helpers
{
    class RegexUtilities
    {
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
        public string ValidateEmails(string mail)
        {
            if (mail == null || mail.Trim() == "")
            {
                mail = string.Empty;
            }
            else
            {
                mail = mail.Replace(" ", "");
                mail = mail.TrimEnd(';');
                string[] partsEmail = mail.Split(';');
                string invalidEmail = "";
                List<string> validEmails = new List<string>();

                foreach (string email in partsEmail)
                {
                    if (!IsValidEmail(email))
                    {
                        invalidEmail += email + ", ";
                    }
                    validEmails.Add(email);
                }
                if (invalidEmail.Length > 0)
                {
                    invalidEmail = invalidEmail.Substring(0, invalidEmail.Length - 2);
                    throw new EmailsInvalidsExceptions(invalidEmail);
                }
                mail = string.Join(";", validEmails);
            }
            return mail;
        }
    }
}
