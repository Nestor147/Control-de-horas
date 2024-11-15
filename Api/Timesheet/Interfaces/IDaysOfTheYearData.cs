using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
    public interface IDaysOfTheYearData : IGenericRepository<DaysOfTheYear>
    {
        Task<BasePager<DaysOfTheYear>> SearchByFilter(ParamsBase param);
    }
}
