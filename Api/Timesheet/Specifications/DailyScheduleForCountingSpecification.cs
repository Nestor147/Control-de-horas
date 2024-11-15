using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class DailyScheduleForCountingSpecification : BaseSpecification<DailySchedule>
    {
        public DailyScheduleForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.ScheduleType.Name, "%" + param.Filter + "%") ))
        {
        }
    }
}
