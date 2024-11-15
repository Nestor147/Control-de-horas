using Timesheet.EFContext.Configuration;
using Timesheet.Entities.Email;
using Timesheet.Helpers.EmailService;

namespace Timesheet.EFContext.Data.EmailService
{
    public class SmtpConfigServiceData
    {
        private readonly TimesheetDBContext _context;

        public SmtpConfigServiceData(TimesheetDBContext context)
        {
            _context = context;
        }
        public void SaveSmtpConfig(SmtpConfig smtpConfig)
        {

            smtpConfig.UserPassword = EncryptionHelper.Encrypt(smtpConfig.UserPassword);
            _context.SmtpConfig.Add(smtpConfig);
            _context.SaveChanges();
        }

        public SmtpConfig GetSmtpConfig()
        {
            var smtpConfig = _context.SmtpConfig.FirstOrDefault(); 
            if (smtpConfig != null)
            {
                smtpConfig.UserPassword = EncryptionHelper.Decrypt(smtpConfig.UserPassword);
            }
            return smtpConfig;
        }
    }
}
