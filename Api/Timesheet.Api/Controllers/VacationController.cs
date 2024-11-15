using Microsoft.AspNetCore.Mvc;
using Timesheet.Business;
using Timesheet.Entities;
using Timesheet.Helpers;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{
    public class VacationController : BaseApiController
    {
        private readonly VacationBusiness _business;

        public VacationController(VacationBusiness business)
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
        public async Task<IActionResult> Save(Vacation entity)
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

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Vacation entity)
        {
            var result = await _business.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = new Vacation() { Id = id };
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
        public async Task<ActionResult<BasePager<Vacation>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }

    }
}
