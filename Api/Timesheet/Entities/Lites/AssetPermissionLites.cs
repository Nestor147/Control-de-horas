using Microsoft.EntityFrameworkCore;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Entities.Lites
{
    [Keyless]
    public class AssetPermissionLites : AssetPermission
    {
        public bool IsSelected { get; set; }
    }
}
