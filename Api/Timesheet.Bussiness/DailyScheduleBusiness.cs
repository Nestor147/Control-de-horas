using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class DailyScheduleBusiness
    {
        private readonly IDailyScheduleData _dataAccess;
        private readonly TimesheetDBContext _context;

        public DailyScheduleBusiness(IDailyScheduleData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<DailySchedule> GetById(int id)
        {
            var entity = await _dataAccess.GetByDailyScheduleId(id);
            if (entity == null)
            {
                throw new TheDailyScheduleSearchedForDoesNotExistExceptions();

            }

            return entity;
        }

        public async Task<IReadOnlyList<DailySchedule>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<DailySchedule> Save(DailySchedule entity)
        {

            entity.InitialTime = TimeZoneInfo.ConvertTime(entity.InitialTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.EndTime = TimeZoneInfo.ConvertTime(entity.EndTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            await ValidateDailySchedule(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<DailySchedule> Update(DailySchedule entity)
        {
            await ValidateDailySchedule(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(DailySchedule entity)
        {
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidateDailySchedule(DailySchedule entity)
        {
            if (entity.DayEnum == null)
            {
                throw new TheNameOfTheDailyScheduleIsEmptyExceptions();
            }
        }
        #endregion

        public async Task<BasePager<DailySchedule>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
