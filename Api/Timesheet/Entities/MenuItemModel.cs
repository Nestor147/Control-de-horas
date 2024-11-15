namespace Timesheet.Entities
{
    public class MenuItemModel
    {
        public int? id { get; set; }
        public int? idFav { get; set; }
        public string title { get; set; }
        public string target { get; set; }
        public string iconClass { get; set; }
        public int? parentId { get; set; }
        public bool isFavority { get; set; }
        public string permission { get; set; }
        public bool isGroup { get; set; }
    }
}
