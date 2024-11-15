using Microsoft.EntityFrameworkCore;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class VacationWithPaginatorSpecification : BaseSpecification<Vacation>
    {
        public VacationWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Employee.Name, "%" + param.Filter + "%") 
        || EF.Functions.Like(x.Employee.Email, "%" + param.Filter + "%")
        || EF.Functions.Like(x.Justification, "%" + param.Filter + "%")
        ))
        {
            AddInclude(p => p.Employee);
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }

        public VacationWithPaginatorSpecification(int id)
       : base(x => x.Id== id)
         
        {
            AddInclude(p => p.Employee);
           
        }
    }
}
