using Microsoft.AspNetCore.Mvc;
using Timesheet.Business;
using Timesheet.Business.Exceptions;
using Timesheet.Entities;
using Timesheet.Helpers;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{
    public class ScheduleTypeController : BaseApiController
    {
        private readonly ScheduleTypeBusiness _business;

        public ScheduleTypeController(ScheduleTypeBusiness business)
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
        public async Task<ActionResult<ScheduleType>> Save(ScheduleType entity)
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




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = new ScheduleType() { Id = id };
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
        public async Task<ActionResult<BasePager<ScheduleType>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }
    }
}
