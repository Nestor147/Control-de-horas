using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.I18n;

namespace Timesheet.Specifications
{
    public class I18NResourceForCountingSpecification : BaseSpecification<I18NResource>
    {
        public I18NResourceForCountingSpecification(ParamsBase param)
        : base(x => string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter) ||
        string.IsNullOrEmpty(param.Filter) || x.DefaultValue.Contains(param.Filter))
        {
        }
    }
}
