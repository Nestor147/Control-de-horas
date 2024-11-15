using Microsoft.EntityFrameworkCore;

namespace Timesheet.Entities.Reports
{
    [Keyless]
    public class EmployeeAttendanceReport
    {

        public int EmployeeId { get; set; }
        public string Email { get; set; } = string.Empty;
       
        public DateTime? CheckInIime { get; set; }
        public DateTime? CheckInRecord { get; set; }
        public int? CheckInDifferenceInMinutes { get; set; }
        public string CheckInMessage { get; set; } = string.Empty;
        public DateTime? DepartureTime { get; set; }
        public DateTime? CheckOutRecord { get; set; }
        public int? CheckOutDifferenceInMinutes { get; set; }
        public string CheckOutMessage { get; set; } = string.Empty;
    }
}
