namespace Timesheet.Entities.I18n
{
    public class I18NResourceItem
    {
        public string ResourceGroup { get; set; }
        public string ResourceName { get; set; }
        public string ResourceValue { get; set; }
        public bool IsTranslated { get; set; }
        public string RegionCode { get; set; }
        public string ResourceFullName { get; set; }
    }
}
