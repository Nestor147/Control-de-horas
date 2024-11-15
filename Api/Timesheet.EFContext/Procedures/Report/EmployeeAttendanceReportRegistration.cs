using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Timesheet.Entities.Reports;
using System.Collections.Generic;
using System.Threading.Tasks;
using Timesheet.EFContext.Configuration;

namespace Timesheet.EFContext.Procedures.Report
{
    public class EmployeeAttendanceReportProcedure
    {
        private readonly TimesheetDBContext _context;

        public EmployeeAttendanceReportProcedure(TimesheetDBContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeAttendanceReport>> ExecuteReportRegistration(DateTime initialDate, DateTime endDate, string employeeIds)
        {
            var initialDateParam = new SqlParameter("@InitialDate", initialDate);
            var endDateParam = new SqlParameter("@EndDate", endDate);
            var employeeIdsParam = new SqlParameter("@EmployeeIds", employeeIds);

            return await _context.EmployeeAttendanceReport
                .FromSqlRaw("EXEC [dbo].[SpReportRegistration] @InitialDate, @EndDate, @EmployeeIds",
                            initialDateParam, endDateParam, employeeIdsParam)
                .ToListAsync();
        }

        public async Task<List<SquadAttendanceReport>> ExecuteReportRegistrationBySquad(DateTime initialDate, DateTime endDate, string squad)
        {
            var initialDateParam = new SqlParameter("@InitialDate", initialDate);
            var endDateParam = new SqlParameter("@EndDate", endDate);
            var squadParam = new SqlParameter("@Squad", squad);

            return await _context.SquadAttendanceReport
                .FromSqlRaw("EXEC [dbo].[SpReportRegistrationBySquad] @InitialDate, @EndDate, @Squad",
                            initialDateParam, endDateParam, squadParam)
                .ToListAsync();
        }


        public async Task<List<SquadAttendanceReport>> ReportRegistrationBySquad(DateTime initialDate, DateTime endDate, string squad)
        {
            var initialDateParam = new SqlParameter("@InitialDate", initialDate);
            var endDateParam = new SqlParameter("@EndDate", endDate);
            var employeeIdsParam = new SqlParameter("@Squad", squad);

            return await _context.SquadAttendanceReport
                .FromSqlRaw("EXEC [dbo].[SpReportRegistrationBySquad] @InitialDate, @EndDate, @Squad",
                            initialDateParam, endDateParam, employeeIdsParam)
                .ToListAsync();
        }

    }
}
