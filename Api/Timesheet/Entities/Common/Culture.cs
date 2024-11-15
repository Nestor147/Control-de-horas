using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities.Common
{
    public partial class Culture
    {
        #region private members
        public string Name { get; set; }
        public string DisplayName { get; set; }

        #endregion private members
        public Culture(CultureInfo cultureInfo)
            : base()
        {
            if (cultureInfo != null)
            {
                Name = cultureInfo.Name;
                DisplayName = cultureInfo.DisplayName;
            }
        }
    }
}
