using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.I18n;

namespace Timesheet.Specifications
{
    public class I18NResourceWithPaginatorSpecification : BaseSpecification<I18NResource>
    {
        public I18NResourceWithPaginatorSpecification(ParamsBase param)
        : base(x => string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter) ||
        string.IsNullOrEmpty(param.Filter) || x.DefaultValue.Contains(param.Filter))
        {
        }
        public I18NResourceWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.I18NResourceGroup);
        }
        public I18NResourceWithPaginatorSpecification()
        {
            AddInclude(p => p.I18NResourceGroup);
        }
    }
}
