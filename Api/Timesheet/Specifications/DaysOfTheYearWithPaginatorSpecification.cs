using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.Specifications
{
    public class DaysOfTheYearWithPaginatorSpecification : BaseSpecification<DaysOfTheYear>
    {

        public DaysOfTheYearWithPaginatorSpecification(ParamsBase param)
        : base(x =>
            (string.IsNullOrEmpty(param.Filter) || EF.Functions.Like(x.DayDate.ToString(), "%" + param.Filter + "%")))
        {
        
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }

        public DaysOfTheYearWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Id);
        }
    }
}
