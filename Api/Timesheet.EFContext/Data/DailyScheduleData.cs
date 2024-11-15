using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class DailyScheduleData : GenericRepository<DailySchedule>, IDailyScheduleData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public DailyScheduleData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<DailySchedule> GetByDailyScheduleId(int id)
        {
            var spec = new DailyScheduleWithPaginatorSpecification(id);
            var result = await _dataAccess.Repository<DailySchedule>().GetAllWithSpec(spec);
            return result.FirstOrDefault();
        }

 

        public async Task<BasePager<DailySchedule>> SearchByFilter(ParamsBase param)
        {
            var spec = new DailyScheduleWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<DailySchedule>().GetAllWithSpec(spec);

            var specCount = new DailyScheduleForCountingSpecification(param);
            var total = await _dataAccess.Repository<DailySchedule>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<DailySchedule>
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
