using Microsoft.EntityFrameworkCore;
using Timesheet.Bussiness.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.Business.I18n
{
    public class I18NResourceBusiness
    {

        private readonly II18NResourceData _dataAccess;
        private readonly TimesheetDBContext _context;

        public I18NResourceBusiness(II18NResourceData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<I18NResource> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            return entity;
        }

        public async Task<IReadOnlyList<I18NResource>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<I18NResource> Save(I18NResource entity)
        {
            await ValidateResource(entity);

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

        public async Task<I18NResource> Update(I18NResource entity)
        {
            await ValidateResource(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(I18NResource entity)
        {
            var existI18NResource = _dataAccess.GetById(entity.Id);
            if (existI18NResource == null)
                throw new TheNameOfTheResourceToBeDeletedDoesNotExistExceptions();
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidateResource(I18NResource entity)
        {
            var existingI18NResource = (await _dataAccess.GetAll())
                .FirstOrDefault(x => x.Name == entity.Name && x.Id != entity.Id);

            if (existingI18NResource != null)
            {
                throw new TheNameOfTheResourceAlreadyExistsExceptions();
            }

            if (string.IsNullOrEmpty(entity.Name))
            {
                throw new TheNameOfTheResourceIsEmptyExceptions();
            }
        }
        #endregion
    }
}
