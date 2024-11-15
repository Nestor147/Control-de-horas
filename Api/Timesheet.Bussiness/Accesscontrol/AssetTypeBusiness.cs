using Microsoft.Extensions.DependencyInjection;
using Timesheet.Business.Exceptions;
using Timesheet.Bussiness.Modules;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Bussiness.Accesscontrol
{
    public class AssetTypeBusiness
    {
        private readonly IAssetTypeData _dataAccess;
        public AssetTypeBusiness()
        {
            _dataAccess = ApplicationModule.service.BuildServiceProvider().GetService<IAssetTypeData>();
        }
        #region Basic Operations

        public async Task<AssetType> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            return entity;
        }

        public async Task<IReadOnlyList<AssetType>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<AssetType> Save(AssetType entity)
        {
            Validate(entity);
            await _dataAccess.Save(entity);
            return entity;

        }
        public async Task<AssetType> Update(AssetType entity)
        {
            Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }

        public void Validate(AssetType entity)
        {
            if (string.IsNullOrEmpty(entity.Name))
                throw new AssetTypeNameEmptyExceptions();

            if (_dataAccess.VerifyIfExist(entity))
                throw new AssetTypeNameAlreadyExistsExceptions(entity.Name);
        }

        public async Task<int> Delete(AssetType entity)
        {
            return await _dataAccess.Delete(entity);
        }
        #endregion

        public async Task<BasePager<AssetType>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
