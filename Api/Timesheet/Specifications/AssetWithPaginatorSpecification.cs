using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class AssetWithPaginatorSpecification : BaseSpecification<Asset>
    {
        public AssetWithPaginatorSpecification(ParamsBase param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Code.Contains(param.Filter)))
        {
            AddInclude(p => p.AssetType);
            ApplyPaging(param.PageSize * (param.PageIndex - 1), param.PageSize);
        }
        public AssetWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.AssetType);
        }
        public AssetWithPaginatorSpecification() : base()
        {
            AddInclude(p => p.AssetType);
        }
    }
}
