using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using Timesheet.Entities.Email;
using Timesheet.Interfaces.Email;
using Timesheet.EFContext.Data.EmailService;

namespace Timesheet.Business.EmailService
{
    public class EmailServiceBusiness : IEmailService
    {
        private readonly SmtpConfigServiceData _smtpConfigService;

        public EmailServiceBusiness(SmtpConfigServiceData smtpConfigService)
        {
            _smtpConfigService = smtpConfigService;
        }

        public async Task SendEmailAsync(string recipient, string subject, string body, bool isHtml = true)
        {
            await SendEmailInternal(new List<string> { recipient }, subject, body, isHtml);
        }

        public async Task SendEmailToManyAsync(List<string> recipients, string subject, string body, bool isHtml = true)
        {
            await SendEmailInternal(recipients, subject, body, isHtml);
        }

        private async Task SendEmailInternal(List<string> recipients, string subject, string body, bool isHtml)
        {
            if (recipients == null || !recipients.Any())
            {
                throw new ArgumentException("Recipient list cannot be null or empty", nameof(recipients));
            }

            var smtpConfig = _smtpConfigService.GetSmtpConfig();
            if (smtpConfig == null)
            {
                throw new InvalidOperationException("No SMTP configuration found.");
            }

            if (string.IsNullOrWhiteSpace(smtpConfig.HostName) ||
                string.IsNullOrWhiteSpace(smtpConfig.SenderEmail) ||
                string.IsNullOrWhiteSpace(smtpConfig.UserName) ||
                string.IsNullOrWhiteSpace(smtpConfig.UserPassword))
            {
                throw new InvalidOperationException("SMTP configuration is missing essential details.");
            }

            try
            {
                using (var client = new SmtpClient(smtpConfig.HostName, smtpConfig.Port))
                {
                    client.EnableSsl = smtpConfig.IsSslEnabled;
                    client.Credentials = new NetworkCredential(smtpConfig.UserName, smtpConfig.UserPassword); 

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(smtpConfig.SenderEmail, smtpConfig.SenderName),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = isHtml
                    };

                    foreach (var recipient in recipients)
                    {
                        if (!string.IsNullOrWhiteSpace(recipient))
                        {
                            mailMessage.To.Add(new MailAddress(recipient));
                        }
                    }

                    if (smtpConfig.ReplyList != null && smtpConfig.ReplyList.Any())
                    {
                        foreach (var replyTo in smtpConfig.ReplyList)
                        {
                            if (!string.IsNullOrWhiteSpace(replyTo))
                            {
                                mailMessage.ReplyToList.Add(new MailAddress(replyTo));
                            }
                        }
                    }

                    await client.SendMailAsync(mailMessage);
                }
            }
            catch (SmtpException ex)
            {
                throw new InvalidOperationException("Failed to send email.", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("An unexpected error occurred while sending email.", ex);
            }
        }
    }
}
