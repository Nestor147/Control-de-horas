using Microsoft.EntityFrameworkCore;

namespace Timesheet.Entities.Reports
{
    [Keyless]
    public class AccessControlRoleReport
    {
        public string Counts { get; set; }
        public string DisplayName { get; set; }
        public string EntityCode { get; set; }
        public string EntityName { get; set; }
        public string Group { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
    }
}
