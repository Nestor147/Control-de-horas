namespace Timesheet.Entities
{
    public class ScheduleType : EntityBase
    {
       
        public string Name { get; set; }

        public virtual ICollection<EmployeeScheduleType>? EmployeeScheduleTypes { get; set; }
        public virtual ICollection<DailySchedule>? DailySchedules { get; set; }
    }
}
