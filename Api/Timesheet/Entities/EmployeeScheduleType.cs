namespace Timesheet.Entities
{
    public class EmployeeScheduleType : EntityBase
    {
        public DateTime InitialDate { get; set; }
        public DateTime EndDate { get; set; }

        public int ScheduleTypeId { get; set; }
        public ScheduleType? ScheduleType { get; set; }
        public  int EmployeeId { get; set; }
        public  Employee? Employee { get; set; }
    }
}
