using Timesheet.Bussiness.Exceptions;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.Business.I18n
{
    public class I18NResourceValueBusiness
    {
        private readonly II18NResourceValueData _dataAccess;

        public I18NResourceValueBusiness(II18NResourceValueData dataAccess)
        {
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<I18NResourceValue> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            return entity;
        }

        public async Task<IReadOnlyList<I18NResourceValue>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<I18NResourceValue> Save(I18NResourceValue entity)
        {
            await ValidateI18NResourceValue(entity);

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

        public async Task<I18NResourceValue> Update(I18NResourceValue entity)
        {
            await ValidateI18NResourceValue(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(I18NResourceValue entity)
        {
            var existI18NResourceValue = _dataAccess.GetById(entity.Id);
            if (existI18NResourceValue == null)
                throw new TheNameOfTheResourceValueToBeDeletedDoesNotExistExceptions();
            return await _dataAccess.Delete(entity);
        }

        private async Task ValidateI18NResourceValue(I18NResourceValue entity)
        {
            var existingI18NResourceValue = (await _dataAccess.GetAll())
                .FirstOrDefault(x => x.Value == entity.Value && x.Id != entity.Id);

            if (existingI18NResourceValue != null)
            {
                throw new TheNameOfTheResourceValueAlreadyExistsExceptions();
            }

            if (string.IsNullOrEmpty(entity.Value))
            {
                throw new TheNameOfTheResourceValueIsEmptyExceptions();
            }
        }

        #endregion


    }
}
