using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{


    public class EmployeeAttendanceWithPaginatorSpecification : BaseSpecification<EmployeeAttendance>
    {
        public EmployeeAttendanceWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Employee.Name, "%" + param.Filter + "%") || EF.Functions.Like(x.Employee.Email, "%" + param.Filter + "%")))
        {
            AddInclude(p => p.Employee);
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }

        public EmployeeAttendanceWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Employee);
        }
    }

  
}
