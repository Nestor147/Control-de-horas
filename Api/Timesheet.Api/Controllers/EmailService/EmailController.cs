using Microsoft.AspNetCore.Mvc;
using Timesheet.EFContext.Data.EmailService;
using Timesheet.Entities.Email;
using Timesheet.Entities.EmailService;
using Timesheet.Interfaces.Email;

namespace Timesheet.Api.Controllers.EmailService
{
    public class EmailController : BaseApiController
    {
        private readonly SmtpConfigServiceData _smtpConfigService;
        private readonly IEmailService _emailService;

        public EmailController(SmtpConfigServiceData smtpConfigService, IEmailService emailService)
        {
            _smtpConfigService = smtpConfigService;
            _emailService = emailService;
        }

        [HttpPost("InsertOrUpdateSmtpConfig")]
        public IActionResult InsertOrUpdateSmtpConfig([FromBody] SmtpConfig smtpConfig)
        {
            if (smtpConfig == null)
            {
                return BadRequest("SMTP configuration data is required.");
            }

            try
            {
                _smtpConfigService.SaveSmtpConfig(smtpConfig);
                return Ok("SMTP configuration saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while saving SMTP configuration: {ex.Message}");
            }
        }

     

        [HttpPost("SendEmail")]
        public async Task<IActionResult> SendEmail(EmailRequest emailRequest)
        {
            if (emailRequest == null || string.IsNullOrWhiteSpace(emailRequest.Recipient))
            {
                return BadRequest("Recipient email address cannot be null or empty");
            }

            try
            {
                await _emailService.SendEmailAsync(emailRequest.Recipient, emailRequest.Subject, emailRequest.Body);
                return Ok("Email sent successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("SendEmailToMany")]
        public async Task<IActionResult> SendEmailToMany([FromBody] BulkEmailRequest bulkEmailRequest)
        {
            await _emailService.SendEmailToManyAsync(bulkEmailRequest.Recipients, bulkEmailRequest.Subject, bulkEmailRequest.Body);
            return Ok("Correos enviados correctamente.");
        }
    }
}
