using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class TimeOffWithPaginatorSpecification : BaseSpecification<TimeOff>
    {
        public TimeOffWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) ||
          EF.Functions.Like(x.Employee.Name, "%" + param.Filter + "%") || EF.Functions.Like(x.Employee.Email, "%" + param.Filter + "%")))
        {
            AddInclude(p => p.Employee);
            ApplyPaging(param.PageSize * (param.PageIndex ), param.PageSize);
        }

        public TimeOffWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Employee);
            
        }
    }
}
