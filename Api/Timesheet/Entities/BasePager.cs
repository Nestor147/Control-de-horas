namespace Timesheet.Entities
{
    public class BasePager<T> where T : class
    {
        public int Count { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public IReadOnlyList<T> Items { get; set; } = new List<T>();
        public int PageCount { get; set; }
    }
}
