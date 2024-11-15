using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class EmployeeAttendanceBusiness
    {
        private readonly DeviceConnectionManager _deviceManager;
        private readonly IEmployeeAttendanceData _dataAccess;
        private readonly IEmployeeData _employeedataAccess;
        private readonly LastSyncDateSingleton _lastSyncDateSingleton;
        public EmployeeAttendanceBusiness(
          DeviceConnectionManager deviceManager,
          IEmployeeAttendanceData dataAccess,
          IEmployeeData employeedataAccess,
          LastSyncDateSingleton lastSyncDateSingleton
            )
        {
            _deviceManager = deviceManager;
            _dataAccess = dataAccess;
            _employeedataAccess = employeedataAccess;
            _lastSyncDateSingleton = lastSyncDateSingleton;

        }

        public async Task<IReadOnlyList<EmployeeAttendance>> GetAllAsync()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<EmployeeAttendance> GetById(int id)
        {
            var entity = await _dataAccess.GetByEmployeeAttendanceId(id);
            return entity;
        }

        public async Task<EmployeeAttendance> Save(EmployeeAttendance entity)
        {


            await _dataAccess.Save(entity);

            return entity;
        }



        public async Task<EmployeeAttendance> Update(EmployeeAttendance entity)
        {
            await _dataAccess.Update(entity);
            return entity;
        }

        public async Task<int> Delete(EmployeeAttendance entity)
        {
            var existEntity = await _dataAccess.GetById(entity.Id);
            if (existEntity == null) return 0;
            return await _dataAccess.Delete(entity);
        }

        public async Task SynchronizeEmployeeAttendanceDataAsync()
        {
            if (!_deviceManager.IsConnected()) return;


            var lastRecord = await _dataAccess.GetLastRecordDateAsync();


            if (lastRecord == null)
            {
                var machineData = _deviceManager.GetLogData();

                foreach (var data in machineData)
                {
                    await Save(data);
                }
            }
            else
            {

                var lastSyncDate = _lastSyncDateSingleton.LastSyncDate;


                if (lastSyncDate == null)
                {
                    lastSyncDate = await _dataAccess.GetLastRecordDateAsync();
                    _lastSyncDateSingleton.SetLastSyncDate(lastSyncDate.Value);
                }

                var machineData = _deviceManager.GetLogData();



                var newEmployeeDates = machineData.Where(data => data.AttendanceDateTime > lastSyncDate).ToList();

                foreach (var item in newEmployeeDates)
                {
                    await Save(item);
                }


                if (newEmployeeDates.Any())
                {
                    _lastSyncDateSingleton.SetLastSyncDate(newEmployeeDates.Max(d => d.AttendanceDateTime));
                }
            }
        }

        public async Task<BasePager<EmployeeAttendance>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }

        public async Task<ICollection<EmployeeAttendance>> GetLogDataByDateRange(DateTime startDate, DateTime endDate, string employeeName)
        {

            var filteredData = await _dataAccess.GetByDateRangeAsync(startDate, endDate, employeeName);

            return filteredData;
        }
    }
}