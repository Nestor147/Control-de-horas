using Timesheet.Entities;

namespace Timesheet.Interfaces

{
    public interface IEmployeePreferencesData : IGenericRepository<EmployeePreferences>
    {
        bool VerifyIfExist(EmployeePreferences entity);
        EmployeePreferences GetByEmployeeId(int EmployeeId);
        bool EmployeeExists(int EmployeeId);
    }
}
