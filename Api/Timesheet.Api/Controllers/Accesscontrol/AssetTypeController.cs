using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Bussiness.Accesscontrol;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers.Accesscontrol
{
    public class AssetTypeController : BaseApiController
    {
        private readonly AssetTypeBusiness _business;

        public AssetTypeController(AssetTypeBusiness business)
        {
            _business = business;
        }
        #region Basic Operations

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<AssetType>> GetById(int id)
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
        public async Task<ActionResult<AssetType>> Save(AssetType entity)
        {
            if (entity.Id == 0)
                await _business.Save(entity);
            else
                await _business.Update(entity);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = new AssetType() { Id = id };
            var result = await _business.Delete(entity);
            return Ok(new { isDeleted = true });
        }
        #endregion


        [HttpGet("SearchByFilter")]
        public async Task<ActionResult<BasePager<AssetType>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }
    }
}
