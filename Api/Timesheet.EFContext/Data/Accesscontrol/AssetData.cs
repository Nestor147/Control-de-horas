
using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.EFContext.Data;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data.Accesscontrol
{
    public class AssetData : GenericRepository<Asset>, IAssetData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;
        public AssetData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<Asset> GetAssetById(int id)
        {
            var specEntity = new AssetWithPaginatorSpecification(id);
            var entity = await _dataAccess.Repository<Asset>().GetByIdWithSpec(specEntity);
            return entity;
        }

        public async Task<List<MenuItemModel>> GetOptionalMenuByEmployeeEmail(string EmployeeEmail, string languageCode)
        {
            var query = @$"	SELECT aca.AssetId Id,  CONVERT(INT,0) idFav,aca.IconClass iconClass
,CONVERT(bit,isnull((SELECT 1 
FROM STRING_SPLIT((Select MenuFavorite From EmployeePreferences up Where up.EmployeeId = us.EmployeeId), '|')
Where value = aca.Code),0)) isFavority
, ISNULL(aca.ParentAssetId,1) parentId, 
	            aca.Code permission, aca.RouterLink target, isnull(t.Value, aca.DisplayName)  title, aca.isGroup
	            FROM Employee us 
	            INNER JOIN AccessControlRole ar ON ar.RoleId = us.RoleId
	            INNER JOIN AccessControlAssetPermission ap ON us.RoleId = ap.RoleId
	            INNER JOIN AccessControlAsset aca ON ap.AssetId=aca.AssetId
	            LEFT JOIN (Select r.Name, v.Value
				            From I18NResourceGroup g
				            inner join I18NResource r on g.I18NResourceGroupId = r.I18NResourceGroupId
				            inner join I18NResourceValue v on r.I18NResourceId = v.I18NResourceId
				            where g.Name = 'MAIN_MENU'
				            and v.RegionCode = '{languageCode}'
				            ) t  on aca.TranslationKey = t.Name
				WHERE us.Email='{EmployeeEmail}'
                ORDER BY aca.ParentOrder, aca.ItemOrder";
            var dataReturn = await _context.MenuItemModel.FromSqlRaw(query).ToListAsync();
            return dataReturn;
        }

        public async Task<IReadOnlyList<Asset>> GetAssetAll()
        {
            var specEntity = new AssetWithPaginatorSpecification();
            var entity = await _dataAccess.Repository<Asset>().GetAllWithSpec(specEntity);
            return entity;
        }
        public async Task<IReadOnlyList<AssetLite>> GetGroupNameFilter(string regionCode, string Filter)
        {
            var query = @$"	SELECT DISTINCT GroupName , dbo.Fni18nLanguage('RESOURCE_GROUP_NAME', GroupName, '{regionCode}') GroupNameValue
                            FROM AccessControlAsset";
            var dataReturn = await _context.AssetLite.FromSqlRaw(query).ToListAsync();
            return dataReturn;
        }


        public async Task<BasePager<Asset>> SearchByFilter(ParamsBase param)
        {
            var spec = new AssetWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<Asset>().GetAllWithSpec(spec);

            var specCount = new AssetForCountingSpecification(param);
            var total = await _dataAccess.Repository<Asset>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<Asset>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool VerifyIfExist(Asset entity)
        {
            var isExists = _context.Asset.Any(o => o.Code.ToUpper() == entity.Code.ToUpper().Trim()
                && o.Id != entity.Id);
            return isExists;
        }
    }
}
