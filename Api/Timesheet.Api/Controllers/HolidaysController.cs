using Microsoft.AspNetCore.Mvc;
using Timesheet.Business;
using Timesheet.Business.Exceptions;
using Timesheet.Entities;
using Timesheet.Helpers;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{
    public class HolidaysController : BaseApiController
    {
        private readonly HolidaysBusiness _business;

        public HolidaysController(HolidaysBusiness business)
        {
            _business = business;
        }

        #region Basic Operations
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entity = await _business.GetById(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var entities = await _business.GetAll();
            return Ok(entities);
        }

        [HttpPost("Save")]
        public async Task<ActionResult<Holidays>> Save(Holidays entity)
        {
            try
            {
                if (entity.Id == 0)
                    await _business.Save(entity);
                else
                    await _business.Update(entity);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpPut("Update")]
        public async Task<IActionResult> Update(Holidays entity)
        {
            var result = await _business.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = new Holidays() { Id = id };
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
        public async Task<ActionResult<BasePager<Holidays>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }

        [HttpGet("GetUniqueYears")]
        public async Task<IActionResult> GetUniqueYears()
        {
            var uniqueYears = await _business.GetUniqueYears(); 
            return Ok(uniqueYears); 
        }

        [HttpGet("FilterByYearAndDescription")]
        public async Task<IActionResult> FilterByYearAndDescription(int? year, string description)
        {
            var filteredHolidays = await _business.FilterHolidaysByYear(year, description);
            return Ok(filteredHolidays);
        }



    }
}
