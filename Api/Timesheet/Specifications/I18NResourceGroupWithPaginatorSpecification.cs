using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.I18n;

namespace Timesheet.Specifications
{
    public class I18NResourceGroupWithPaginatorSpecification : BaseSpecification<I18NResourceGroup>
    {
        public I18NResourceGroupWithPaginatorSpecification(ParamsBase param)
        : base(x => string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter))
        {
        }
    }
}
