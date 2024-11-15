using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class TimeOffBusiness
    {
        private readonly ITimeOffData _dataAccess;
        private readonly TimesheetDBContext _context;
        private readonly IEmployeeData _employeedataAccess;

        public TimeOffBusiness(ITimeOffData dataAccess, TimesheetDBContext context, IEmployeeData employeedataAccess)
        {
            _context = context;
            _dataAccess = dataAccess;
            _employeedataAccess = employeedataAccess;
        }

        #region Basic Operations

        public async Task<TimeOff> GetById(int id)
        {
            var entity = await _dataAccess.GetByPermissionId(id);
            if (entity == null)
            {
                throw new TheTimeOffSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<TimeOff>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<TimeOff> Save(TimeOff entity)
        {
        
            entity.InitialDateTime = TimeZoneInfo.ConvertTime(entity.InitialDateTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.EndDateTime = TimeZoneInfo.ConvertTime(entity.EndDateTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.InitialCompensationDateTime = TimeZoneInfo.ConvertTime(entity.InitialCompensationDateTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.EndCompensationDateTime = TimeZoneInfo.ConvertTime(entity.EndCompensationDateTime, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.RequestDate = TimeZoneInfo.ConvertTime(entity.RequestDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));

            await ValidatePermission(entity);
            await _dataAccess.Save(entity);

            return entity;
        }

        public async Task<TimeOff> Update(TimeOff entity)
        {
            await ValidatePermission(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(TimeOff entity)
        {
      
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidatePermission(TimeOff entity)
        {
            if ( string.IsNullOrEmpty(entity.Justification))
            {
                throw new TheNameOfTheTimeOffIsEmptyExceptions();
            }
        }
        #endregion

        public async Task<BasePager<TimeOff>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
