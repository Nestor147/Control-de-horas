using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities;
using Microsoft.EntityFrameworkCore;

namespace Timesheet.Specifications
{
   
    public class EmployeeAttendanceForCountingSpecification : BaseSpecification<EmployeeAttendance>
    {
        public EmployeeAttendanceForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Employee.Name, "%" + param.Filter + "%") || EF.Functions.Like(x.Employee.Email, "%" + param.Filter + "%")))
        {
        }
    }
}
