using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class DaysOfTheYearBusiness
    {
        private readonly IDaysOfTheYearData _dataAccess;
        private readonly TimesheetDBContext _context;

        public DaysOfTheYearBusiness(IDaysOfTheYearData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<DaysOfTheYear> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            if (entity == null)
            {
                throw new TheDaysOfTheYearSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<DaysOfTheYear>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<DaysOfTheYear> Save(DaysOfTheYear entity)
        {
            entity.DayDate = TimeZoneInfo.ConvertTime(entity.DayDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            
            await ValidateDaysOfTheYear(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<DaysOfTheYear> Update(DaysOfTheYear entity)
        {
            await ValidateDaysOfTheYear(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(DaysOfTheYear entity)
        {
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidateDaysOfTheYear(DaysOfTheYear entity)
        {
            if (entity.DayDate != null)
            {
                throw new TheNameOfTheDaysOfTheYearIsEmptyExceptions();
            }
        }
        #endregion

        public async Task<BasePager<DaysOfTheYear>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
