using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces;
using Timesheet.Interfaces.I18n;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class ScheduleTypeData : GenericRepository<ScheduleType>, IScheduleTypeData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public ScheduleTypeData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<BasePager<ScheduleType>> SearchByFilter(ParamsBase param)
        {
            var spec = new ScheduleTypeWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<ScheduleType>().GetAllWithSpec(spec);

            var specCount = new ScheduleTypeForCountingSpecification(param);
            var total = await _dataAccess.Repository<ScheduleType>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<ScheduleType>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

       

        public bool IsExitsName(ScheduleType entity)
        {
            var isExists = _context.ScheduleType.Any(o => o.Name.ToUpper() == entity.Name.ToUpper() && o.Id != entity.Id);
            return isExists;
        }


    }
}
