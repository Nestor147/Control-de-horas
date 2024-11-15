using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Core;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Bussiness.Accesscontrol
{
    public class AssetBusiness
    {
        private readonly IAssetData _dataAccess;
        private readonly GlobalSession _globalSession;
        public AssetBusiness(IAssetData dataAccess, GlobalSession globalSession)
        {
            this._dataAccess = dataAccess;
            this._globalSession = globalSession;
        }
        #region Basic Operations

        public async Task<Asset> GetById(int id)
        {
            var entity = await _dataAccess.GetAssetById(id);
            return entity;
        }

        public async Task<List<MenuItemModel>> GetOptionalMenuByEmployeeEmail(string languageCode)
        {
            var assets = await _dataAccess.GetOptionalMenuByEmployeeEmail(_globalSession.Employee.Email, languageCode);
            return assets;
        }

        public async Task<IReadOnlyList<Asset>> GetAll()
        {
            var entities = await _dataAccess.GetAssetAll();
            return entities;
        }

        public async Task<Asset> Save(Asset entity)
        {
            Validate(entity);
            await _dataAccess.Save(entity);
            return entity;

        }
        public async Task<Asset> Update(Asset entity)
        {
            Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }

        public void Validate(Asset entity)
        {
            if (string.IsNullOrEmpty(entity.Code))
                throw new AssetCodeEmptyExceptions();

            if (string.IsNullOrEmpty(entity.DisplayName))
                throw new AssetDisplayNameEmptyExceptions();

            if (entity.AssetTypeId == null || entity.AssetTypeId == 0)
                throw new AssetAssetTypeEmptyExceptions();

            if (_dataAccess.VerifyIfExist(entity))
                throw new AssetCodeAlreadyExistsExceptions(entity.Code);

            entity.AssetType = null;
        }

        public async Task<int> Delete(Asset entity)
        {
            return await _dataAccess.Delete(entity);
        }
        #endregion

        public async Task<BasePager<Asset>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
        public async Task<IReadOnlyList<AssetLite>> GetGroupNameFilter(string filter)
        {
            var regionCode = _globalSession.DefaultLanguage;
            var listData = await _dataAccess.GetGroupNameFilter(regionCode, filter);
            return listData;
        }
    }
}
