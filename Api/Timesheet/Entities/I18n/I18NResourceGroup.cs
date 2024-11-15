namespace Timesheet.Entities.I18n
{
    public class I18NResourceGroup : EntityBase
    {
        public string Name { get; set; }
        public virtual ICollection<I18NResource>? I18NResource { get; set; }
    }
}
