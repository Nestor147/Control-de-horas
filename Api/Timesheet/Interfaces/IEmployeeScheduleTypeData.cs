using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
  

    public interface IEmployeeScheduleTypeData : IGenericRepository<EmployeeScheduleType>
    {
        Task<BasePager<EmployeeScheduleType>> SearchByFilter(ParamsBase param);
        Task<EmployeeScheduleType> GetByEmployeeScheduleTypeId(int id);
        
    }
}
