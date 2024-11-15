using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetTypeForCountingSpecification : BaseSpecification<AssetType>
    {
        public AssetTypeForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter)))
        {
        }
    }
}
