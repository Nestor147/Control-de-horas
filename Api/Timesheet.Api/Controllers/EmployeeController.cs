
using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Business;
using Timesheet.Entities;
using Timesheet.Helpers;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{

    public class EmployeeController : BaseApiController
    {
        private readonly EmployeeBusiness _business;

        public EmployeeController(EmployeeBusiness business)
        {
            _business = business;           
        }

        [HttpPost("synchronize")]
        public async Task<IActionResult> Synchronize()
        {
            if (!_business.IsConnected())
            {
                return BadRequest("Device is not connected.");
            }

            await _business.SynchronizeEmployeeProfiles();
            return Ok("Synchronization complete.");
        }

        #region Basic Operations
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Employee>> GetById(int id)
        {
            var entity = await _business.GetById(id);
            if (entity == null)
                return NotFound(new CodeErrorResponse(404));
            return Ok(entity);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var listData = await _business.GetAll();
            return Ok(listData);
        }

 
        [HttpPost("Save")]
        public async Task<ActionResult<Employee>> Save(Employee entity)
        {


            try
            {
                if (entity.Id != 0)
                    await _business.Update(entity);
              
                return Ok(entity);
            }
       
            catch (Exception ex)
            {
                return StatusCode(500, new { message =  ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = new Employee() { Id = id };
                var result = await _business.Delete(entity);
                return Ok(new { isDeleted = true });
            }
            catch (Exception e)
            {
                throw new ExceptionMessage(e.Message);
            }
        }
        #endregion

        [HttpGet("SearchByFilter")]
        public async Task<ActionResult<BasePager<Employee>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }

        [HttpGet("GetIdByEmployee")]
        public ActionResult<int> GetProfileInfo(string email)
        {
            return Ok(_business.getIdByEmail(email) );
        }

        #region report 
        [HttpGet("SearchByFilterEmployeeField")]
        public async Task<ActionResult<BasePager<Employee>>> SearchByFilterEmployeeField([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilterEmployeeField(param));
        }
        #endregion
    }

    public class Device
    {
        public string IpAddress { get; set; }
        public int Port { get; set; }
    }
}
