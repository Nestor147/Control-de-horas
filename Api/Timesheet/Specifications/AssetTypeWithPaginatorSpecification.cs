using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetTypeWithPaginatorSpecification : BaseSpecification<AssetType>
    {
        public AssetTypeWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter)))
        {
        }
    }
}
