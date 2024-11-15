using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetForCountingSpecification : BaseSpecification<Asset>
    {
        public AssetForCountingSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Code.Contains(param.Filter)))
        {
        }
    }
}
