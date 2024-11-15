namespace Timesheet.Specifications
{
    public class ParamsPaginator
    {
        public string Sort { get; set; } = "1";
        public int PageIndex { get; set; } = 1;
        private const int MaxPageSize = 999999999;
        private int _pageSize = 25;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
