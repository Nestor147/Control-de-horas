using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class HolidaysWithPaginatorSpecification : BaseSpecification<Holidays>
    {
        public HolidaysWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Description, "%" + param.Filter + "%")))
        {
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }
}
