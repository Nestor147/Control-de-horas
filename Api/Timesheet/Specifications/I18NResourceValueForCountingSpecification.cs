using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.I18n;

namespace Timesheet.Specifications
{
    public class I18NResourceValueForCountingSpecification : BaseSpecification<I18NResourceValue>
    {
        public I18NResourceValueForCountingSpecification(ParamsResource param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Value.Contains(param.Filter)) &&
        (string.IsNullOrEmpty(param.RegionCode) || x.RegionCode.Contains(param.RegionCode)) &&
        (param.I18NResourceId == 0 || x.I18NResourceId == param.I18NResourceId))
        {
        }
    }
}
