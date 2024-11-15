using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class VacationBusiness
    {
        private readonly IVacationData _dataAccess;
        private readonly IEmployeeData _employeedataAccess;
        private readonly TimesheetDBContext _context;

        public VacationBusiness(IVacationData dataAccess, TimesheetDBContext context, IEmployeeData employeedataAccess)
        {
            _context = context;
            _dataAccess = dataAccess;
            _employeedataAccess = employeedataAccess;
        }

        #region Basic Operations

        public async Task<Vacation> GetById(int id)
        {
            var entity = await _dataAccess.GetByVacationId(id);
            if (entity == null)
            {
                throw new TheVacationSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<Vacation>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<Vacation> Save(Vacation entity)

        {

            entity.InitialDate = TimeZoneInfo.ConvertTime(entity.InitialDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.EndDate = TimeZoneInfo.ConvertTime(entity.EndDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.RequestDate = TimeZoneInfo.ConvertTime(entity.RequestDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            if (entity.Employee != null)
            {
                _employeedataAccess.Detached(entity.Employee);

                _employeedataAccess.Unchanged(entity.Employee);
            }
            await ValidateVacation(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<Vacation> Update(Vacation entity)
        {
            await ValidateVacation(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(Vacation entity)
        {
          
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidateVacation(Vacation entity)
        {

            if ( string.IsNullOrEmpty(entity.Justification))
            {
                throw new TheNameOfTheVacationIsEmptyExceptions();
            }
        }
        #endregion

        public async Task<BasePager<Vacation>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
