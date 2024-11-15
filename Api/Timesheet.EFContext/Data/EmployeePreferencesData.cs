using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;

namespace Timesheet.EFContext.Data
{
    public class EmployeePreferencesData : GenericRepository<EmployeePreferences>, IEmployeePreferencesData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public EmployeePreferencesData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public EmployeePreferences GetByEmployeeId(int EmployeeId)
        {
            var entity = _context.EmployeePreferences.Where(p => p.EmployeeId == EmployeeId).FirstOrDefault();
            if (entity == null)
            {
                entity = new EmployeePreferences();
            }
            return entity;
        }

        public bool EmployeeExists(int EmployeeId)
        {
            return _context.Employee.Any(p => p.Id == EmployeeId);
        }

        public bool VerifyIfExist(EmployeePreferences entity)
        {
            return true;
        }
    }
}
