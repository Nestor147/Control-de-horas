using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class DailyScheduleWithPaginatorSpecification : BaseSpecification<DailySchedule>
    {
        public DailyScheduleWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.ScheduleType.Name, "%" + param.Filter + "%")))
        {
            AddInclude(p => p.ScheduleType);

            ApplyPaging(param.PageSize * (param.PageIndex ), param.PageSize);
        }


        public DailyScheduleWithPaginatorSpecification(int id)
       : base(x => x.Id==id)
        {
            AddInclude(p => p.ScheduleType);

        
        }
    }
}
