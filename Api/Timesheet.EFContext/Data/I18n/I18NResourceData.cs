using Timesheet.EFContext.Configuration;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.EFContext.Data.I18n
{
    public class I18NResourceData : GenericRepository<I18NResource>, II18NResourceData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public I18NResourceData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

    }
}
