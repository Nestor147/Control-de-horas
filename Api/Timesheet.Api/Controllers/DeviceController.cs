
using Microsoft.AspNetCore.Mvc;
using Timesheet.Business;

namespace Timesheet.Api.Controllers
{

    public class DeviceController : BaseApiController
    {
        private readonly DeviceConnectionManager _deviceManager;
        public DeviceController(DeviceConnectionManager deviceManager)
        {
            _deviceManager = deviceManager;
            //2024-08-14T09:10:00

        }

        [HttpPost("Connect")]
        public IActionResult Connect()
        {
            if ( _deviceManager.IsConnected())
            {
                return Ok("Device is already connected");
            }

            var isConnected =  _deviceManager.Connect();
            if (isConnected)
            {
                return Ok("Device connected successfully");
            }

            return StatusCode(500, "Failed to connect to the device.");
        }

        [HttpPost("Disconnect")]
        public IActionResult Disconnect()
        {
            _deviceManager.Disconnect();
            return Ok("Device disconnected successfully.");
        }
    }

    public class DeviceConnectionInfo
    {
        public string IpAddress { get; set; }
        public int Port { get; set; }
    }
}
