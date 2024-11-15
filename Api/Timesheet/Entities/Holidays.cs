namespace Timesheet.Entities
{
    public class Holidays : EntityBase
    {
        public DateTime HolidayDate { get; set; }
        public string Description { get; set; }
    }
}
