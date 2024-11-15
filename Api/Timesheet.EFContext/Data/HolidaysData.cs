using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class HolidaysData : GenericRepository<Holidays>, IHolidaysData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public HolidaysData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<ICollection<Holidays>> FilterHolidaysByYearAndDescription(int? year, string description)
        {
            var query = _context.Holidays.AsQueryable();
            if (year.HasValue)
            {
                query = query.Where(h => h.HolidayDate.Year == year.Value);
            }
            if (!string.IsNullOrEmpty(description))
            {
                query = query.Where(h => h.Description.Contains(description)); 
            }

            return await query.ToListAsync();
        }

        public async Task<BasePager<Holidays>> SearchByFilter(ParamsBase param)
        {
            var spec = new HolidaysWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<Holidays>().GetAllWithSpec(spec);

            var specCount = new HolidaysForCountingSpecification(param);
            var total = await _dataAccess.Repository<Holidays>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<Holidays>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

       

        public bool IsExitsDescription(Holidays entity)
        {
            var isExists = _context.Holidays.Any(o => o.Description == entity.Description && o.Id != entity.Id);
            return isExists;
        }

    }
}
