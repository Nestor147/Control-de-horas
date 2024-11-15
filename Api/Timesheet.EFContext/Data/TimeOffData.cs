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
    public class TimeOffData : GenericRepository<TimeOff>, ITimeOffData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public TimeOffData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<TimeOff> GetByPermissionId(int id)
        {
            var spec = new TimeOffWithPaginatorSpecification(id);
            var result = await _dataAccess.Repository<TimeOff>().GetAllWithSpec(spec);
            return result.FirstOrDefault();
        }

      

        public async Task<BasePager<TimeOff>> SearchByFilter(ParamsBase param)
        {
            var spec = new TimeOffWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<TimeOff>().GetAllWithSpec(spec);

            var specCount = new TimeOffForCountingSpecification(param);
            var total = await _dataAccess.Repository<TimeOff>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<TimeOff>
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
