using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class EmployeeWithPaginatorSpecification : BaseSpecification<Employee>
    {
        public EmployeeWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Email, "%" + param.Filter + "%") || EF.Functions.Like(x.Name, "%" + param.Filter + "%") || EF.Functions.Like(x.Role.Name, "%" + param.Filter + "%")))

        //     : base(x => (string.IsNullOrEmpty(param.Filter) 
        //|| EF.Functions.Like(x.Role.Name, "%" + param.Filter + "%")))

        {
            AddInclude(p => p.Role);
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
        public EmployeeWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Role);
        }
    }
}
