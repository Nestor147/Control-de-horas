namespace Timesheet.Entities
{
    public class DailySchedule :EntityBase
    {

        public int DayEnum { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ScheduleTypeId { get; set; }
        public ScheduleType? ScheduleType { get; set; }
    }
}
