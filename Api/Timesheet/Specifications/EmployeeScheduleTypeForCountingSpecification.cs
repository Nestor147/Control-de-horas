using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class EmployeeScheduleTypeForCountingSpecification : BaseSpecification<EmployeeScheduleType>
    {
        public EmployeeScheduleTypeForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Employee.Name, "%" + param.Filter + "%") || EF.Functions.Like(x.Employee.Email, "%" + param.Filter + "%")))
        {
        }
    }
}
