using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.I18n;
using Timesheet.Specifications;

namespace Timesheet.Interfaces

{
    public interface IEmployeeAttendanceData : IGenericRepository<EmployeeAttendance>
    {
        Task<BasePager<EmployeeAttendance>> SearchByFilter(ParamsBase param);

        Task<DateTime?> GetLastRecordDateAsync();
        Task<EmployeeAttendance> GetByCodeAndDateAsync(int codeId, DateTime date);

        Task<EmployeeAttendance> GetByEmployeeAttendanceId(int id);
        Task<ICollection<EmployeeAttendance>> GetByDateRangeAsync(DateTime? startDate, DateTime? endDate , string? employeeName);



    }
}
