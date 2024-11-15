using Microsoft.EntityFrameworkCore;

namespace Timesheet.Entities.Reports
{
    [Keyless]
    public class SquadAttendanceReport
    {
        public string SquadName { get; set; } = string.Empty;
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int WeekNumber { get; set; }
        public string LiteralDay { get; set; } = string.Empty;
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckInRecord { get; set; }
        public int? CheckInDifferenceInMinutes { get; set; }
        public string CheckInMessage { get; set; } = string.Empty;
        public DateTime? DepartureTime { get; set; }
        public DateTime? CheckOutRecord { get; set; }
        public int? CheckOutDifferenceInMinutes { get; set; }
        public string CheckOutMessage { get; set; } = string.Empty;
    }
}
