namespace Timesheet.Entities.I18n
{
    public class I18NResource : EntityBase
    {
        public string Name { get; set; }
        public string DefaultValue { get; set; }
        public int I18NResourceGroupId { get; set; }
        public virtual I18NResourceGroup? I18NResourceGroup { get; set; }
        public ICollection<I18NResourceValue>? I18NResourceValue { get; set; }
    }
}
