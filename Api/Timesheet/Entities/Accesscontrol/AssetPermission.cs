namespace Timesheet.Entities.Accesscontrol

{
    public class AssetPermission : EntityBase
    {
        public int AssetId { get; set; }
        public virtual Asset? Asset { get; set; }
        public int EntityId { get; set; }
        public int RoleId { get; set; }
        public virtual Role? Role { get; set; }
    }
}
