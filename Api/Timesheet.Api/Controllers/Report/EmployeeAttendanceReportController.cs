using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net.Mime;
using Timesheet.Business.Report;
using Timesheet.EFContext.Procedures.Report;


namespace Timesheet.Api.Controllers.Report
{
    public class EmployeeAttendanceReportController : BaseApiController
    {
        private readonly EmployeeAttendanceReportProcedure _context;
        private readonly RpEmployeeAttendanceReport _rpEmployeeAttendanceReport;

        public EmployeeAttendanceReportController(EmployeeAttendanceReportProcedure context
             , RpEmployeeAttendanceReport rpEmployeeAttendanceReport)
        {
            _rpEmployeeAttendanceReport = rpEmployeeAttendanceReport;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReport(DateTime initialDate, DateTime endDate, string employeeIds)
        {
            try
            {
                var result = await _context.ExecuteReportRegistration(initialDate, endDate, employeeIds);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetReportBySquad")]
        public async Task<IActionResult> GetReportBySquad(DateTime initialDate, DateTime endDate, string squad)
        {
            try
            {
                var result = await _context.ExecuteReportRegistrationBySquad(initialDate, endDate, squad);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("ReportRegistrationBySquad")]
        //public async Task<IActionResult> ReportRegistrationBySquad()
        public async Task<IActionResult> ReportRegistrationBySquad(DateTime initialDate, DateTime endDate, string squad)
        {
            // Especificamos explícitamente el formato de fecha que estamos utilizando
            //DateTime initialDate = DateTime.ParseExact("09/01/2024", "MM/dd/yyyy", CultureInfo.InvariantCulture);
            //DateTime endDate = DateTime.ParseExact("09/30/2024", "MM/dd/yyyy", CultureInfo.InvariantCulture);
            //string squad = "AANS";

            try
            {
                var listSource = await _context.ReportRegistrationBySquad(initialDate, endDate, squad);
                var report = _rpEmployeeAttendanceReport.PrepareDataReport(listSource);

                Response.ContentType = report.MimeType;
                return File(report.Content, MediaTypeNames.Application.Octet, $"Report.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
