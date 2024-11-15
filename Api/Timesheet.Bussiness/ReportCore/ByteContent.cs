namespace Timesheet.Business.ReportCore
{
    public class ByteContent
    {
        public byte[] Content { get; set; } = Array.Empty<byte>();
        public string MimeType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
