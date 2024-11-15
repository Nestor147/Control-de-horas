using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Runtime.InteropServices;
using Timesheet.Entities;
using Timesheet.Entities.Common;
using zkemkeeper;

namespace Timesheet.Business
{
    public class DeviceConnectionManager
    {
        private readonly CZKEM? _device;
        private bool _isConnected;
        private readonly int _machineNumber = 1; // Asegúrate de usar el número de máquina correcto
        private readonly DeviceConnection _deviceConnection;

        public DeviceConnectionManager(IOptions<DeviceConnection> deviceConnection)
        {
            _deviceConnection = deviceConnection.Value;
            try
            {
                _device = new CZKEM();
            }
            catch (COMException ex)
            {
                _isConnected = false;
                Console.WriteLine($"Error al crear la instancia de CZKEM: {ex.Message}");
            }            
        }

        public bool Connect()
        {

            if (_device == null)
            {
                return false;
            }

            if (!_isConnected)
            {
                _isConnected = _device.Connect_Net(_deviceConnection.IpAddress, _deviceConnection.Port);
                if (!_isConnected)
                {
                    Console.WriteLine("No se pudo conectar al dispositivo.");
                }
            }
            return _isConnected;
        }

        public void Disconnect()
        {
            if (_device == null)
            {
                _isConnected = false;
                return;
            }

            if (_isConnected)
            {
                _device.Disconnect();
                _isConnected = false;
            }
        }

        public bool IsConnected()
        {
            return _isConnected;
        }


        #region Employee

        public List<Employee> GetAllEmployeeInfo()
        {
            string sdwEnrollNumber = string.Empty, sName = string.Empty, sPassword = string.Empty;
            int iPrivilege = 0, iFlag = 0, iTmpLength = 0, idwFingerIndex;
            bool bEnabled = false;

            var lstFPTemplates = new List<Employee>();

            if (_device == null) return lstFPTemplates;

            _device.ReadAllUserID(_machineNumber);
            _device.ReadAllTemplate(_machineNumber);

            while (_device.SSR_GetAllUserInfo(_machineNumber, out sdwEnrollNumber, out sName, out sPassword, out iPrivilege, out bEnabled))
            {
                for (idwFingerIndex = 0; idwFingerIndex < 10; idwFingerIndex++)
                {
                    string sTmpData = string.Empty;
                    if (_device.GetUserTmpExStr(_machineNumber, sdwEnrollNumber, idwFingerIndex, out iFlag, out sTmpData, out iTmpLength))
                    {

                        var fpInfo = new Employee
                        {
                            Id = int.Parse(sdwEnrollNumber),
                            Name = sName,
                            RoleId = iPrivilege,
                            Active = bEnabled,
                            Email = sPassword,
                        };
                        lstFPTemplates.Add(fpInfo);
                    }
                }
            }

            return lstFPTemplates;
        }
        #endregion

        #region EmployeeAttendance
        public List<EmployeeAttendance> GetLogData()
        {
            var employess = new List<Employee>();
            string dwEnrollNumber = "";
            int dwVerifyMode = 0;
            int dwInOutMode = 0;
            int dwYear = 0;
            int dwMonth = 0;
            int dwDay = 0;
            int dwHour = 0;
            int dwMinute = 0;
            int dwSecond = 0;
            int dwWorkCode = 0;
            var lstEmployeeDates = new List<EmployeeAttendance>();

            if (_device == null) return lstEmployeeDates;

            _device.ReadAllGLogData(_machineNumber);

            while (_device.SSR_GetGeneralLogData(
                    _machineNumber,
                 out dwEnrollNumber,
                 out dwVerifyMode,
                 out dwInOutMode,
                 out dwYear,
                 out dwMonth,
                 out dwDay,
                 out dwHour,
                 out dwMinute,
                 out dwSecond,
                 ref dwWorkCode))
            {
                var dateTime = new DateTime(dwYear, dwMonth, dwDay, dwHour, dwMinute, dwSecond);
                int employeeId = int.Parse(dwEnrollNumber);


                lstEmployeeDates.Add(new EmployeeAttendance
                {

                    EmployeeId = employeeId,
                    AttendanceDateTime = dateTime
                });
            }

            return lstEmployeeDates;
        }
        #endregion
    }
}
