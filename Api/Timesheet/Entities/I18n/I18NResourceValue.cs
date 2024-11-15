namespace Timesheet.Entities.I18n
{
    public class I18NResourceValue : EntityBase
    {
        public string RegionCode { get; set; }
        public string Value { get; set; }
        public int I18NResourceId { get; set; }
        public I18NResource? I18NResource { get; set; }

    }
}
