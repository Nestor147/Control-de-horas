using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{

    public interface ITimeOffData : IGenericRepository<TimeOff>
    {
        Task<BasePager<TimeOff>> SearchByFilter(ParamsBase param);
        Task<TimeOff> GetByPermissionId(int id);
    }
}
