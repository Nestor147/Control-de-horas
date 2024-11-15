using Microsoft.Extensions.DependencyInjection;
using Timesheet.Business.Exceptions;
using Timesheet.Bussiness.Modules;
using Timesheet.EFContext.Core;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.Lites;
using Timesheet.Entities.Reports;
using Timesheet.Interfaces;
using Timesheet.Interfaces.Email;
using Timesheet.Specifications;

namespace Timesheet.Bussiness.Accesscontrol
{
    public class AssetPermissionBusiness
    {
        private readonly IAssetPermissionData _dataAccess;
        private readonly GlobalSession _globalSession;
        public AssetPermissionBusiness(GlobalSession globalSession)
        {
            _dataAccess = ApplicationModule.service.BuildServiceProvider().GetService<IAssetPermissionData>();
            _globalSession = globalSession;
        }
        #region Basic Operations

        public async Task<AssetPermission> GetById(int id)
        {
            var entity = await _dataAccess.GetAssetPermissionById(id);
            return entity;
        }

        public async Task<IReadOnlyList<AssetPermission>> GetAll()
        {
            var entities = await _dataAccess.GetAssetPermissionAll();
            return entities;
        }

        public async Task<AssetPermission> Save(AssetPermission entity)
        {
            Validate(entity);
            await _dataAccess.Save(entity);
            return entity;

        }
        public async Task<AssetPermission> Update(AssetPermission entity)
        {
            Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }

        public void Validate(AssetPermission entity)
        {
            if (entity.AssetId == 0)
                throw new AssetPermissionAssetEmptyExceptions();

            if (entity.EntityId == 0)
                throw new AssetPermissionEntityEmptyExceptions();

            if (entity.RoleId == 0)
                throw new AssetPermissionRoleEmptyExceptions();


            if (_dataAccess.VerifyIfExist(entity))
                throw new AssetPermissionAssetEntityRoleAlreadyExistsExceptions();

            entity.Asset = null;
            entity.Role = null;
        }

        public async Task<int> Delete(AssetPermission entity)
        {
            return await _dataAccess.Delete(entity);
        }
        #endregion

        public async Task<BasePager<AssetPermission>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }


        public async Task<IReadOnlyList<AssetPermissionLites>> GetAllByTypeIdAndFilter(int roleId, string filter, int typeId)
        {
            var entities = await _dataAccess.GetAllByTypeIdAndFilter(roleId, filter, typeId);
            return entities;
        }
        public async Task SaveFromAssetPermissionAvailableAsync(AssetPermissionLites[] assetPermisions)
        {
            foreach (var item in assetPermisions)
            {
                if (item.Id == 0 && item.IsSelected == true)
                {

                    await _dataAccess.Save(ConvertPermission(item));
                }
                else if (item.Id != 0 && item.IsSelected == false)
                {
                    var permission = new AssetPermission();
                    permission.Id = item.Id;
                    await _dataAccess.Delete(permission);
                }
            }
        }
        public AssetPermission ConvertPermission(AssetPermissionLites entity)
        {
            var permission = new AssetPermission();
            permission.AssetId = entity.AssetId;
            permission.RoleId = entity.RoleId;
            return permission;
        }

        #region Reports
        public async Task<List<AccessControlRoleReport>> GetAssetPermissionMenu(int assetTypeId)
        {
            var result = await _dataAccess.GetAssetPermissionMenu(assetTypeId, _globalSession.DefaultLanguage);
            return result;
        }
        #endregion
    }
}

