namespace Timesheet.Entities.Accesscontrol
{
    public class Asset : EntityBase
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public int? AssetTypeId { get; set; }
        public AssetType? AssetType { get; set; }
        public bool IsGlobal { get; set; }
        public string GroupName { get; set; }
        public string IconClass { get; set; }
        public string RouterLink { get; set; }
        public string TranslationKey { get; set; }

    }
}
