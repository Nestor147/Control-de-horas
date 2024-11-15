using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetPermissionWithPaginatorSpecification : BaseSpecification<AssetPermission>
    {
        public AssetPermissionWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter)))
        {
            AddInclude(p => p.Asset);
            AddInclude(p => p.Role);
            ApplyPaging(param.PageSize * (param.PageIndex - 1), param.PageSize);
        }
        public AssetPermissionWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Asset);
            AddInclude(p => p.Role);
        }
        public AssetPermissionWithPaginatorSpecification() : base()
        {
            AddInclude(p => p.Asset);
            AddInclude(p => p.Role);
        }
    }
}
