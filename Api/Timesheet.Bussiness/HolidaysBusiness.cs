using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class HolidaysBusiness
    {
        private readonly IHolidaysData _dataAccess;
        private readonly TimesheetDBContext _context;

        public HolidaysBusiness(IHolidaysData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<Holidays> GetById(int id)
        {
            var entity = await _dataAccess.GetById(id);
            if (entity == null)
            {
                throw new TheHolidaysSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<Holidays>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<Holidays> Save(Holidays entity)
        {
            entity.HolidayDate = TimeZoneInfo.ConvertTime(entity.HolidayDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
        
            await ValidateHolidays(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<Holidays> Update(Holidays entity)
        {
            await ValidateHolidays(entity);
            await _dataAccess.Update(entity);
            return entity;
        }

        public async Task<int> Delete(Holidays entity)
        {
       
            return await _dataAccess.Delete(entity);
        }


       
        private async Task ValidateHolidays(Holidays entity)
        {
         
            if (_dataAccess.IsExitsDescription(entity))
            {
                throw new(string.Format("The description {0} already exists. ", entity.Description));
            }
        }

        #endregion

        public async Task<BasePager<Holidays>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }

        public async Task<IEnumerable<object>> GetUniqueYears()
        {
            var holidays = await _dataAccess.GetAll(); 

            
            var uniqueYears = holidays
                .Select(h => h.HolidayDate.Year) 
                .Distinct() 
                .OrderBy(y => y) 
                .Select(year => new { Year = year }) 
                .ToList(); 

            return uniqueYears; 
        }



        public async Task<ICollection<Holidays>> FilterHolidaysByYear(int? year, string description)
        {
            var filteredData = await _dataAccess.FilterHolidaysByYearAndDescription(year, description);

            return filteredData;
        }


    }
}
