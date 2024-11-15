using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class DaysOfTheYearData : GenericRepository<DaysOfTheYear>, IDaysOfTheYearData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public DaysOfTheYearData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<BasePager<DaysOfTheYear>> SearchByFilter(ParamsBase param)
        {
            var spec = new DaysOfTheYearWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<DaysOfTheYear>().GetAllWithSpec(spec);

            var specCount = new DaysOfTheYearForCountingSpecification(param);
            var total = await _dataAccess.Repository<DaysOfTheYear>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<DaysOfTheYear>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }
    }
}
