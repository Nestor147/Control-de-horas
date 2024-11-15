using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Bussiness.Accesscontrol;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{
    public class AssetController : BaseApiController
    {
        private readonly AssetBusiness _business;

        public AssetController(AssetBusiness business)
        {
            _business = business;
        }
        #region Basic Operations

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Asset>> GetById(int id)
        {
            var entity = await _business.GetById(id);
            if (entity == null)
                return NotFound(new CodeErrorResponse(404));

            return Ok(entity);
        }
        [HttpGet("GetOptMenuByEmployeeEmail")]
        public async Task<IActionResult> GetOptionalMenuByEmployeeEmail([FromQuery] string languageCode)
        {
            var assets = await _business.GetOptionalMenuByEmployeeEmail(languageCode);
            return Ok(assets);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var listData = await _business.GetAll();
            return Ok(listData);
        }

        [HttpPost("Save")]
        public async Task<ActionResult<Asset>> Save(Asset entity)
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
            var entity = new Asset() { Id = id };
            var result = await _business.Delete(entity);
            return Ok(new { isDeleted = true });
        }
        #endregion


        [HttpGet("SearchByFilter")]
        public async Task<ActionResult<BasePager<Asset>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            return Ok(await _business.SearchByFilter(param));
        }
        [HttpGet("GetGroupNameFilter")]
        public async Task<IActionResult> GetGroupNameFilter(string filter)
        {
            var listData = await _business.GetGroupNameFilter(filter);
            return Ok(listData);
        }


    }
}
