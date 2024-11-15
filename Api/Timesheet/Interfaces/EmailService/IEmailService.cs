namespace Timesheet.Interfaces.Email
{
    public interface IEmailService
    {
        Task SendEmailAsync(string recipient, string subject, string body, bool isHtml = true);
        Task SendEmailToManyAsync(List<string> recipients, string subject, string body, bool isHtml = true);
    }
}
