using Timesheet.EFContext.Core;
using Timesheet.Entities;
using Timesheet.Entities.Common;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class EmployeePreferencesBusiness
    {
        private readonly IEmployeePreferencesData _dataAccess;
        private readonly GlobalSession _globalSession;

        public EmployeePreferencesBusiness(IEmployeePreferencesData dataAccess, GlobalSession globalSession)
        {
            _dataAccess = dataAccess;
            _globalSession = globalSession;
        }

        #region Basic Operations

        public async Task<EmployeePreferences> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            return entity;
        }

        public async Task<IReadOnlyList<EmployeePreferences>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<EmployeePreferences> Save(EmployeePreferences entity)
        {
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<EmployeePreferences> Update(EmployeePreferences entity)
        {
            await _dataAccess.Update(entity);
            return entity;
        }

        public void Validate(EmployeePreferences entity)
        {
            // Implementación de validación según tus necesidades
        }

        public async Task<int> Delete(EmployeePreferences entity)
        {
            return await _dataAccess.Delete(entity);
        }

        #endregion

        public async Task<bool> EmployeeExists(int EmployeeId)
        {
            return _dataAccess.EmployeeExists(EmployeeId);
        }

        public EmployeePreferences GetByEmployeeId()
        {
            var entity = _dataAccess.GetByEmployeeId(_globalSession.Employee.Id);
            return entity;
        }

        #region Culture

        public BasePager<Culture> SearchCulturePagerByFilter(ParamsBase param)
        {
            if (string.IsNullOrEmpty(param.Filter))
            {
                param.Filter = string.Empty;
            }

            int startRowIndex = (param.PageSize * param.PageIndex);
            var allCultureInfo = System.Globalization.CultureInfo.GetCultures(System.Globalization.CultureTypes.SpecificCultures);
            var cultureInfoFiltered = allCultureInfo.Where(c => c.Name.StartsWith(param.Filter, StringComparison.OrdinalIgnoreCase)).ToList();
            var result = new BasePager<Culture>
            {
                Count = cultureInfoFiltered.Count,
                Items = cultureInfoFiltered
                    .Where(c => c.Name.StartsWith(param.Filter, StringComparison.OrdinalIgnoreCase))
                .Skip(startRowIndex)
                    .Take(param.PageSize)
                    .Select(item => new Culture(item))
                    .ToList()
            };

            return result;
        }

        #endregion
    }
}
