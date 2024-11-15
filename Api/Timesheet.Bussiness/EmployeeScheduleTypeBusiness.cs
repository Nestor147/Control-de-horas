using Timesheet.Business.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class EmployeeScheduleTypeBusiness
    {
        private readonly IEmployeeScheduleTypeData _dataAccess;
        private readonly IEmployeeData _employeedataAccess;
        private readonly IScheduleTypeData _scheduletypedataAccess;
        private readonly TimesheetDBContext _context;

        public EmployeeScheduleTypeBusiness(IEmployeeScheduleTypeData dataAccess, TimesheetDBContext context, IEmployeeData employeedataAccess, IScheduleTypeData scheduletypedataAccess)
        {
            _context = context;
            _dataAccess = dataAccess;
            _employeedataAccess = employeedataAccess;
            _scheduletypedataAccess = scheduletypedataAccess;
        }

        #region Basic Operations

        public async Task<EmployeeScheduleType> GetById(int id)
        {
            var entity = await _dataAccess.GetByEmployeeScheduleTypeId(id);
            if (entity == null)
            {
                throw new TheEmployeeScheduleTypeSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<EmployeeScheduleType>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            
            return entities;
        }

        public async Task<EmployeeScheduleType> Save(EmployeeScheduleType entity)
        {
            entity.InitialDate = TimeZoneInfo.ConvertTime(entity.InitialDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            entity.EndDate = TimeZoneInfo.ConvertTime(entity.EndDate, TimeZoneInfo.FindSystemTimeZoneById("SA Western Standard Time"));
            await ValidateResource(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<EmployeeScheduleType> Update(EmployeeScheduleType entity)
        {
            await ValidateResource(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(EmployeeScheduleType entity)
        {
        
            return await _dataAccess.Delete(entity);
        }


        private async Task ValidateResource(EmployeeScheduleType entity)
        {

            if (entity.Id==null)
            {
                throw new TheNameOfTheEmployeeScheduleTypeIsEmptyExceptions();
            }
        }
        #endregion

        public async Task<BasePager<EmployeeScheduleType>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
