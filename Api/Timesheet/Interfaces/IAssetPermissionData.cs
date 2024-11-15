using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.Lites;
using Timesheet.Entities.Reports;
using Timesheet.Specifications;

namespace Timesheet.Interfaces

{
    public interface IAssetPermissionData : IGenericRepository<AssetPermission>
    {
        Task<AssetPermission> GetAssetPermissionById(int id);
        Task<IReadOnlyList<AssetPermission>> GetAssetPermissionAll();
        Task<BasePager<AssetPermission>> SearchByFilter(ParamsBase param);
        bool VerifyIfExist(AssetPermission entity);
        Task<IReadOnlyList<AssetPermissionLites>> GetAllByTypeIdAndFilter(int roleId, string filter, int typeId);
        Task<List<AccessControlRoleReport>> GetAssetPermissionMenu(int assetTypeId, string regionCode);
    }
}
