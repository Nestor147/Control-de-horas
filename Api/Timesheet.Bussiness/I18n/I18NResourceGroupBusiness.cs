using Microsoft.EntityFrameworkCore;
using Timesheet.Bussiness.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.Business.I18n
{
    public class I18NResourceGroupBusiness
    {
        private readonly II18NResourceGroupData _dataAccess;
        private readonly TimesheetDBContext _context;
        public I18NResourceGroupBusiness(II18NResourceGroupData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations
        public async Task<I18NResourceGroup> GetById(int I18NResourceGroupId)
        {
            var entity = await _dataAccess.GetById(I18NResourceGroupId);

            if (entity == null)
            {
                throw new TheResourceGroupDoesNotExistExceptions();
            }

            return entity;
        }

        public async Task<IReadOnlyList<I18NResourceGroup>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<I18NResourceGroup> Save(I18NResourceGroup entity)
        {
            await ValidateI18NResourceGroup(entity);

            if (entity.Id == 0)
            {
                await _dataAccess.Save(entity);
            }
            else
            {
                await _dataAccess.Update(entity);
            }

            return entity;

        }
        public async Task<I18NResourceGroup> Update(I18NResourceGroup entity)
        {
            await ValidateI18NResourceGroup(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(I18NResourceGroup entity)
        {
            var existI18NResourceGroup = _dataAccess.GetById(entity.Id);
            if (existI18NResourceGroup == null)
                throw new TheResourceGroupToBeDeletedDoesNotExistExceptions();
            return await _dataAccess.Delete(entity);
        }

        private async Task ValidateI18NResourceGroup(I18NResourceGroup entity)
        {
            var existingI18NResourceGroup = (await _dataAccess.GetAll())
                .FirstOrDefault(x => x.Name == entity.Name && x.Id != entity.Id);

            if (existingI18NResourceGroup != null)
            {
                throw new ResourceGroupAlreadyExistsExceptions();
            }

            if (string.IsNullOrEmpty(entity.Name))
            {
                throw new ResourceNameIsEmptyExceptions();
            }
        }
        #endregion
    }

}
