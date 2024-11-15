using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{

    public interface IDailyScheduleData : IGenericRepository<DailySchedule>
    {
        Task<BasePager<DailySchedule>> SearchByFilter(ParamsBase param);
        Task<DailySchedule> GetByDailyScheduleId(int id);
    }
}
