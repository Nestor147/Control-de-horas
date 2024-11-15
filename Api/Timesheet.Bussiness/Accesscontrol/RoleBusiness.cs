using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Core;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Bussiness.Accesscontrol
{
    public class RoleBusiness
    {
        private readonly IRoleData _dataAccess;
        private readonly GlobalSession _globalSession;
        public RoleBusiness(IRoleData dataAccess, GlobalSession globalSession)
        {
            _dataAccess = dataAccess;
            _globalSession = globalSession;

        }
        #region Basic Operations

        public async Task<Role> GetById(int id)
        {
            var entity = await _dataAccess.GetRoleById(id);
            return entity;
        }

        public async Task<IReadOnlyList<Role>> GetAll()
        {
            var entities = await _dataAccess.GetRoleAll();
            return entities;
        }
        public async Task<IReadOnlyList<Role>> GetAllByRole()
        {
            var EmployeeId = _globalSession.Employee.Id;
            return await _dataAccess.GetAllByRole(EmployeeId);
        }

        public async Task<Role> Save(Role entity)
        {
            Validate(entity);
            await _dataAccess.Save(entity);
            return entity;

        }
        public async Task<Role> Update(Role entity)
        {
            Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }

        public void Validate(Role entity)
        {
            if (string.IsNullOrEmpty(entity.Name))
                throw new RoleNameEmptyExceptions();

            if (string.IsNullOrEmpty(entity.Description))
                throw new RoleDescriptionEmptyExceptions();

            if (_dataAccess.VerifyIfExist(entity))
                throw new RoleNameAlreadyExistsExceptions(entity.Name);

        }

        public async Task<int> Delete(Role entity)
        {
            return await _dataAccess.Delete(entity);
        }
        #endregion

        public async Task<BasePager<Role>> SearchByFilter(ParamsEntity param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
