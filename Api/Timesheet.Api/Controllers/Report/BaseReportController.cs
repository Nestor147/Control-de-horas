using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using Timesheet.Business.ReportCore;

namespace Timesheet.Api.Controllers.Report
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseReportController : ControllerBase
    {
        public IActionResult Print(ByteContent bytes, string fileName)
        {
            Response.ContentType = bytes.MimeType;
            return File(bytes.Content, MediaTypeNames.Application.Octet, $"{fileName}.pdf");
        }
        public IActionResult ToCsv(byte[] content, string fileName)
        {
            Response.ContentType = "text/csv";
            return File(content, MediaTypeNames.Application.Octet, $"{fileName}.csv");
        }
    }
}
