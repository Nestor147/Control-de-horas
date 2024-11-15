using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Specifications
{
    public class ParamsResource : ParamsBase
    {
        public int I18NResourceGroupId { get; set; }
        public int I18NResourceId { get; set; }
        public string RegionCode { get; set; }
    }
}
