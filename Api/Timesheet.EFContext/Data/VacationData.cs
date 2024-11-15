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
    public class VacationData : GenericRepository<Vacation>, IVacationData
    {

        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public VacationData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<Vacation> GetByVacationId(int id)
        {
            var spec = new VacationWithPaginatorSpecification(id);
            var result = await _dataAccess.Repository<Vacation>().GetAllWithSpec(spec);
            return result.FirstOrDefault();
        }

     

        public async Task<BasePager<Vacation>> SearchByFilter(ParamsBase param)
        {
            var spec = new VacationWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<Vacation>().GetAllWithSpec(spec);

            var specCount = new VacationForCountingSpecification(param);
            var total = await _dataAccess.Repository<Vacation>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<Vacation>
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
