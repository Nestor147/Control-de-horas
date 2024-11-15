namespace Timesheet.Specifications
{
    public class ParamsBase : ParamsPaginator
    {
        public string Filter { get; set; } = "";
        public int Id { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public bool IsTrue { get; set; } = false;
    }
}
