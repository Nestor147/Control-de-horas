using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class EmployeeForCountingSpecification : BaseSpecification<Employee>
    {
        public EmployeeForCountingSpecification(ParamsBase param)
       : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Email, "%" + param.Filter + "%") || EF.Functions.Like(x.Name, "%" + param.Filter + "%")))
        {
        }
    }

}