namespace Timesheet.Entities
{
    public class EmployeeAttendance : EntityBase
    {
        public DateTime AttendanceDateTime { get; set; }

        public int EmployeeId { get; set; } 
        public Employee? Employee { get; set; }
    }
}
