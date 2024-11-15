using Timesheet.Business.Exceptions;
using Timesheet.Bussiness.Exceptions;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class ScheduleTypeBusiness
    {
        private readonly IScheduleTypeData _dataAccess;
        private readonly TimesheetDBContext _context;

        public ScheduleTypeBusiness(IScheduleTypeData dataAccess, TimesheetDBContext context)
        {
            _context = context;
            _dataAccess = dataAccess;
        }

        #region Basic Operations

        public async Task<ScheduleType> GetById(int id)
        {
            
            var entity = await _dataAccess.GetById(id);
            if (entity == null)
            {
                throw new TheScheduleTypeSearchedForDoesNotExistExceptions();
            }
            return entity;
        }

        public async Task<IReadOnlyList<ScheduleType>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<ScheduleType> Save(ScheduleType entity)
        {
            await Validate(entity);
            await _dataAccess.Save(entity);
            return entity;
        }

        public async Task<ScheduleType> Update(ScheduleType entity)
        {
            await Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }



        public async Task<int> Delete(ScheduleType entity)
        {
          
            return await _dataAccess.Delete(entity);
        }

        private async Task Validate(ScheduleType entity)
        {

            if (_dataAccess.IsExitsName(entity))
            {
                throw new(string.Format("The name {0} already exists. ", entity.Name));
            }
        }

        #endregion

        public async Task<BasePager<ScheduleType>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }
    }
}
