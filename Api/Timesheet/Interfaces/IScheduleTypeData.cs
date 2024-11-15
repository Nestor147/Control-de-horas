using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
    public interface IScheduleTypeData : IGenericRepository<ScheduleType>
    {
        Task<BasePager<ScheduleType>> SearchByFilter(ParamsBase param);

        bool IsExitsName(ScheduleType entity);
    }
}
