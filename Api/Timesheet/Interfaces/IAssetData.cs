

using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
    public interface IAssetData : IGenericRepository<Asset>
    {
        Task<Asset> GetAssetById(int id);
        Task<IReadOnlyList<Asset>> GetAssetAll();
        Task<IReadOnlyList<AssetLite>> GetGroupNameFilter(string regionCode, string Filter);

        Task<BasePager<Asset>> SearchByFilter(ParamsBase param);
        Task<List<MenuItemModel>> GetOptionalMenuByEmployeeEmail(string EmployeeEmail, string languageCode);
        bool VerifyIfExist(Asset entity);
    }
}
