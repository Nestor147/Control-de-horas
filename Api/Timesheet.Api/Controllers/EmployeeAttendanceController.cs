using Microsoft.AspNetCore.Mvc;
using Timesheet.Business;
using Timesheet.Entities;
using Timesheet.Helpers;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{

    public class EmployeeAttendanceController : BaseApiController
    {
        private readonly EmployeeAttendanceBusiness _business;

        public EmployeeAttendanceController(EmployeeAttendanceBusiness business)
        {
            _business = business;
        }

        #region Basic Operations
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listData = await _business.GetAllAsync();
                return Ok(listData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los datos: {ex.Message}");
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var entity = await _business.GetById(id);
                if (entity == null) return NotFound();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener el dato: {ex.Message}");
            }
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save(EmployeeAttendance entity)
        {
            try
            {
                if (entity.Id == 0)
                    await _business.Save(entity);
                else
                    await _business.Update(entity);
                return Ok(entity);
            }
            catch (Exception e)
            {
                throw new ExceptionMessage(e.Message);
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = new EmployeeAttendance() { Id = id };
                var result = await _business.Delete(entity);
                return Ok(new { isDeleted = true });
            }
            catch (Exception e)
            {
                throw new ExceptionMessage(e.Message);
            }
        }
        #endregion

        // Sincronización de datos
        [HttpPost("RetrieveAndSaveAllData")]
        public async Task<IActionResult> RetrieveAndSaveAllData()
        {
            try
            {
                await _business.SynchronizeEmployeeAttendanceDataAsync();
                return Ok("Sincronización completa.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error durante la sincronización: {ex.Message}");
            }
        }


        [HttpGet("GetDataByDateRange")]
        public async Task<IActionResult> RetrieveAndSaveDataByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] string? employeeName = null)
        {
            if (startDate > endDate)
            {
                return BadRequest("La fecha de inicio no puede ser mayor que la fecha de fin.");
            }

            var records = await _business.GetLogDataByDateRange(startDate, endDate, employeeName ?? string.Empty);
            return Ok(records);
        }



        [HttpGet("SearchByFilter")]
        public async Task<ActionResult<BasePager<EmployeeAttendance>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }


    }
}
