using Microsoft.EntityFrameworkCore;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Entities
{

    public class Employee : EntityBase
    {

        public string Email { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public int RoleId { get; set; }
        public Role? Role { get; set; }

        public virtual ICollection<EmployeeAttendance>? EmployeeAttendances { get; set; }
        public virtual ICollection<EmployeeScheduleType>? EmployeeScheduleTypes { get; set; }
        public virtual ICollection<TimeOff>? TimesOff { get; set; }
        public virtual ICollection<Vacation>? Vacations { get; set; }

    }
}
