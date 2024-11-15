namespace Timesheet.Entities
{
    public class TimeOff : EntityBase
    {
        public int TimeOffType { get; set; }
        public DateTime InitialDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string Justification { get; set; }
        public DateTime InitialCompensationDateTime { get; set; }
        public DateTime EndCompensationDateTime { get; set; }
        public DateTime RequestDate { get; set; }

        public bool Active { get; set; }  

        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }

}
