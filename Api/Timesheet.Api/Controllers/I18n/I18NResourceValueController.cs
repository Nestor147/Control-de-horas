using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Timesheet.Business.I18n;
using Timesheet.Entities.I18n;

namespace Timesheet.Api.Controllers.I18n
{
    public class I18NResourceValueController : BaseApiController
    {
        private readonly I18NResourceValueBusiness _business;

        public I18NResourceValueController(I18NResourceValueBusiness business)
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
        public async Task<IActionResult> Save(I18NResourceValue entity)
        {
            var result = await _business.Save(entity);
            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(I18NResourceValue entity)
        {
            var result = await _business.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _business.GetById(id);
            if (entity == null) return NotFound();
            await _business.Delete(entity);
            return NoContent();
        }
        #endregion



    }
}
