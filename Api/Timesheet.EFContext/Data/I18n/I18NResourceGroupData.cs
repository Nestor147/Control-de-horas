using Timesheet.EFContext.Configuration;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.EFContext.Data.I18n
{
    public class I18NResourceGroupData : GenericRepository<I18NResourceGroup>, II18NResourceGroupData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public I18NResourceGroupData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public I18NResourceItem GetResourceItem(string groupName, string resourceName)
        {
            throw new NotImplementedException();
        }

        public I18NResourceItem GetResourceItem(string groupName, string resourceName, string language)
        {
            throw new NotImplementedException();
        }
    }
}
