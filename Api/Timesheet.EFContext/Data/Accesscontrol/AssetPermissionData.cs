using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.EFContext.Data;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.Lites;
using Timesheet.Entities.Reports;
using Timesheet.Interfaces;
using Timesheet.Interfaces.Email;
using Timesheet.Specifications;


namespace Timesheet.EFContext.Data.Accesscontrol
{
    public class AssetPermissionData : GenericRepository<AssetPermission>, IAssetPermissionData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;
        public AssetPermissionData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<AssetPermission> GetAssetPermissionById(int id)
        {
            var specEntity = new AssetPermissionWithPaginatorSpecification(id);
            var entity = await _dataAccess.Repository<AssetPermission>().GetByIdWithSpec(specEntity);
            return entity;
        }

        public async Task<IReadOnlyList<AssetPermission>> GetAssetPermissionAll()
        {
            var specEntity = new AssetPermissionWithPaginatorSpecification();
            var entity = await _dataAccess.Repository<AssetPermission>().GetAllWithSpec(specEntity);
            return entity;
        }

        public async Task<BasePager<AssetPermission>> SearchByFilter(ParamsBase param)
        {
            var spec = new AssetPermissionWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<AssetPermission>().GetAllWithSpec(spec);

            var specCount = new AssetPermissionForCountingSpecification(param);
            var total = await _dataAccess.Repository<AssetPermission>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<AssetPermission>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool VerifyIfExist(AssetPermission entity)
        {
            var isExists = _context.AssetPermission.Any(o => o.AssetId == entity.AssetId
                && o.RoleId == entity.RoleId
                && o.Id != entity.Id);
            return isExists;
        }
        public async Task<IReadOnlyList<AssetPermissionLites>> GetAllByTypeIdAndFilter(int roleId, string filter, int typeId)
        {
            string sqlString = $@"Select ISNULL(acap.AssetPermissionId,0)as Id,aca.AssetId,  ISNULL(acr.RoleId,{roleId}) AS RoleId,
            CONVERT(BIT, CASE
            WHEN ISNULL(acap.AssetPermissionId,0) = 0 THEN 'false'
            Else 'true'
            END ) AS IsSelected
            From AccessControlAssetPermission  acap
            inner join AccessControlRole acr on acap.RoleId = acr.RoleId
            right join AccessControlAsset aca on acap.AssetId = aca.AssetId
            inner join AccessControlAssetType acat on aca.AssetTypeId = acat.AssetTypeId
            Where acat.AssetTypeId = {typeId}
            and (acr.RoleId is null or acr.RoleId = {roleId})
            and aca.DisplayName like '%{filter}%'
            UNION
            Select 0 Id, aca.AssetId, {roleId} RoleId, CONVERT(bit, 0) IsSelected 
            From  AccessControlAsset aca 
            inner join AccessControlAssetType acat on aca.AssetTypeId = acat.AssetTypeId
            Where aca.AssetId not in (Select aca.AssetId
            From AccessControlAssetPermission  acap
            inner join AccessControlRole acr on acap.RoleId = acr.RoleId
            inner join AccessControlAsset aca on acap.AssetId = aca.AssetId
            inner join AccessControlAssetType acat on aca.AssetTypeId = acat.AssetTypeId
            Where acat.AssetTypeId = {typeId}
            and (acr.RoleId = {roleId})
            and aca.DisplayName like '%{filter}%')
            and aca.DisplayName like '%{filter}%'";
            var result = await _context.AssetPermissionLites.FromSqlRaw(sqlString).Include(j => j.Asset).ToListAsync();
            return result;
        }
        public async Task<List<AccessControlRoleReport>> GetAssetPermissionMenu(int assetTypeId, string regionCode)
        {
            var cmd = @$"Select 'x' Counts,  dbo.Fni18nLanguage('MAIN_MENU',a.DisplayName, '{regionCode}') DisplayName, '101337' EntityCode, 'Instituto Adventista de Tecnologia' EntityName, a.GroupName [Group],a.DisplayName Name, r.Name Role
            from AccessControlAsset a
            inner join AccessControlAssetPermission ap 
            on a.AssetId = ap.AssetId
            inner join AccessControlRole r
            on ap.RoleId = r.RoleId
            where a.AssetTypeId = {assetTypeId}";
            var result = await _context.AccessControlRoleReport.FromSqlRaw(cmd).OrderBy(x => x.Group).ToListAsync();
            return result;
        }
    }
}
