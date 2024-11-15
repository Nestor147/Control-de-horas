using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
    public interface IVacationData : IGenericRepository<Vacation>
    {
        Task<BasePager<Vacation>> SearchByFilter(ParamsBase param);
        Task<Vacation> GetByVacationId(int id);
    }
}
