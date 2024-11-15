using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Bussiness.Accesscontrol;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.Lites;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers
{
    public class AssetPermissionController : BaseApiController
    {
        private readonly AssetPermissionBusiness _business;

        public AssetPermissionController(AssetPermissionBusiness business)
        {
            _business = business;
        }
        #region Basic Operations
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<AssetPermission>> GetById(int id)
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

        [HttpGet("GetIsEnableAccessMenu")]
        public ActionResult<bool> GetIsEnableAccessMenu(string EmployeeName)
        {
            var EmployeeN = EmployeeName;
            return true;
        }


        [HttpPost("Save")]
        public async Task<ActionResult<AssetPermission>> Save(AssetPermission entity)
        {
            if (entity.Id == 0)
                await _business.Save(entity);
            else
                await _business.Update(entity);
            return Ok(entity);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(AssetPermission entity)
        {
            var result = await _business.Delete(entity);
            return Ok(new { isDeleted = true });
        }
        #endregion


        [HttpGet("SearchByFilter")]
        public async Task<ActionResult<BasePager<AssetPermission>>> SearchByFilter([FromQuery] ParamsBase param)
        {
            var listData = await _business.SearchByFilter(param);
            return Ok(listData);
        }

        [Route("SaveListAssetPermission")]
        [HttpPost]
        public async Task<IActionResult> SaveFromAssetPermissionAvailable(AssetPermissionLites[] assetPermisions)
        {
            await _business.SaveFromAssetPermissionAvailableAsync(assetPermisions);

            var listData = await _business.GetAllByTypeIdAndFilter(2, "", 2);
            return Ok(assetPermisions);
        }

        [HttpGet("GetAllByTypeIdAndFilter")]
        public async Task<IActionResult> GetAllByTypeIdAndFilter(int roleId, string filter, int typeId)
        {
            var listData = await _business.GetAllByTypeIdAndFilter(roleId, filter, typeId);
            return Ok(listData);
        }
    }
}



