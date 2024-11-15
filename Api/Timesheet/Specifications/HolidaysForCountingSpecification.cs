using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class HolidaysForCountingSpecification : BaseSpecification<Holidays>
    {
        public HolidaysForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Description, "%" + param.Filter + "%") ))
        {
        }
    }
}
