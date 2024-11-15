using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class EmployeeScheduleTypeData : GenericRepository<EmployeeScheduleType>, IEmployeeScheduleTypeData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public EmployeeScheduleTypeData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }
        public async Task<EmployeeScheduleType> GetByEmployeeScheduleTypeId(int id)
        {
            var spec = new EmployeeScheduleTypeWithPaginatorSpecification(id);
            var result = await _dataAccess.Repository<EmployeeScheduleType>().GetAllWithSpec(spec);
            return result.FirstOrDefault();
        }
        public async Task<BasePager<EmployeeScheduleType>> SearchByFilter(ParamsBase param)
        {
            var spec = new EmployeeScheduleTypeWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<EmployeeScheduleType>().GetAllWithSpec(spec);

            var specCount = new EmployeeScheduleTypeForCountingSpecification(param);
            var total = await _dataAccess.Repository<EmployeeScheduleType>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<EmployeeScheduleType>
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
