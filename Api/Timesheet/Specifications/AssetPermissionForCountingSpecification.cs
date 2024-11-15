using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetPermissionForCountingSpecification : BaseSpecification<AssetPermission>
    {
        public AssetPermissionForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter)))
        {
        }
    }
}
