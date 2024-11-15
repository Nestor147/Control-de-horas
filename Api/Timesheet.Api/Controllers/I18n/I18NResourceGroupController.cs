using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Business.I18n;
using Timesheet.Entities.I18n;

namespace Timesheet.Api.Controllers.I18n
{
    public class I18NResourceGroupController : BaseApiController
    {
        private readonly I18NResourceGroupBusiness _business;

        public I18NResourceGroupController(I18NResourceGroupBusiness business)
        {
            _business = business;
        }


        #region Basic Operations
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<I18NResourceGroup>> GetById(int id)
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
        public async Task<ActionResult<I18NResourceGroup>> Save(I18NResourceGroup entity)
        {
            if (entity.Id == 0)
                await _business.Save(entity);
            else
                await _business.Update(entity);
            return Ok(entity);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(I18NResourceGroup entity)
        {
            var result = await _business.Update(entity);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = new I18NResourceGroup() { Id = id };
            var result = await _business.Delete(entity);
            return Ok(new { isDeleted = true });
        }

        #endregion




    }
}
