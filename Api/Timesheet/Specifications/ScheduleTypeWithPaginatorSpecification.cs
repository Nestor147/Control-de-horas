using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class ScheduleTypeWithPaginatorSpecification : BaseSpecification<ScheduleType>
    {
        public ScheduleTypeWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Name, "%" + param.Filter + "%") ))
        {
            ApplyPaging(param.PageSize * (param.PageIndex ), param.PageSize);
        }
    }
}
