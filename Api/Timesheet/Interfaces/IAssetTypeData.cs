using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Interfaces

{
    public interface IAssetTypeData : IGenericRepository<AssetType>
    {
        Task<BasePager<AssetType>> SearchByFilter(ParamsBase param);
        bool VerifyIfExist(AssetType entity);
    }
}
