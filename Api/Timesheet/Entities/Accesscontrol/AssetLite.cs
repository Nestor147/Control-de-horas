using Microsoft.EntityFrameworkCore;

namespace Timesheet.Entities.Accesscontrol

{
    [Keyless]
    public class AssetLite
    {
        public string GroupName { get; set; }
        public string GroupNameValue { get; set; }
    }
}
