using Microsoft.Reporting.NETCore;
using Timesheet.Business.ReportCore;
using Timesheet.Entities.Reports;

namespace Timesheet.Business.Report
{
    [EmbeddedLayout("Timesheet.Business.Report.Layout.ReportWorkAttendance.rdlc")]
    public class RpEmployeeAttendanceReport : RepRender
    {
        public ByteContent PrepareDataReport(List<SquadAttendanceReport> listSource)
        {
            localReport.DataSources.Add(new ReportDataSource("DsSquadAttendanceReport", listSource));
            return Render();
        }
    }
}
