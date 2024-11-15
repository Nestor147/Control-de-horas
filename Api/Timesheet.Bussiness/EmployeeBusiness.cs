
using Timesheet.EFContext.Core;
using Timesheet.Entities;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.Business
{
    public class EmployeeBusiness
    {
        private readonly DeviceConnectionManager _deviceManager;
        private readonly IEmployeeData _dataAccess;
        private readonly IRoleData _roledataAccess;
        GlobalSession _globalSession;

        public EmployeeBusiness(DeviceConnectionManager deviceManager, IEmployeeData dataAccess, GlobalSession globalSession, IRoleData roledataAccess)
        {
            _deviceManager = deviceManager;
            _dataAccess = dataAccess;
            _globalSession = globalSession;
            _roledataAccess = roledataAccess;
        }

        #region Basic Operations

        public async Task<Employee> GetById(int id)
        {
            var entity = await _dataAccess.GetEmployeeById(id);
            return entity;
        }

        public async Task<IReadOnlyList<Employee>> GetAll()
        {
            var entities = await _dataAccess.GetAll();
            return entities;
        }

        public async Task<Employee> Save(Employee entity)
        {

            await _dataAccess.Save(entity);
            return entity;
        }
        public async Task<Employee> Update(Employee entity)
        {
            await Validate(entity);
            await _dataAccess.Update(entity);
            return entity;
        }


        public async Task Validate(Employee entity)
        {


            if (_dataAccess.emailAlreadyExists(entity))
            {
                throw new(string.Format("The email {0} already exists. ", entity.Email));
            }

            if (_dataAccess.nameAlreadyExists(entity))
            {
                throw new(string.Format("The name {0} already exists. ", entity.Name));

            }
        }



        public async Task<int> Delete(Employee entity)
        {
            return await _dataAccess.Delete(entity);
        }

        #endregion

        public bool IsConnected()
        {
            return _deviceManager.IsConnected();
        }
        public async Task SynchronizeEmployeeProfiles()
        {
            if (!_deviceManager.IsConnected()) return;

            var profilesFromDevice = _deviceManager.GetAllEmployeeInfo();

            foreach (var profile in profilesFromDevice)
            {
                var existingProfile = await _dataAccess.GetById(profile.Id);


                if (existingProfile == null)
                {

                    await Save(profile);

                }

            }
        }

        public async Task<BasePager<Employee>> SearchByFilter(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilter(param);
            return result;
        }

        public Employee EmployeeValidateLogin(string email)
        {
            var result = _dataAccess.EmployeeValidateLogin(email);
            return result;
        }

        #region report Employee field
        public async Task<BasePager<EmployeeField>> SearchByFilterEmployeeField(ParamsBase param)
        {
            var result = await _dataAccess.SearchByFilterEmployeeField(param);
            return result;
        }
        #endregion

        public int getIdByEmail(string employee)
        {
            var result = _dataAccess.VerifyAccessEmployeeByEmail(employee);

            return result == null ? 0 : result.Id;
        }
    }
}