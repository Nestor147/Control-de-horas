using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Bussiness.Accesscontrol;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Api.Controllers.Accesscontrol
{
    public class RoleController : BaseApiController
    {
        private readonly RoleBusiness _business;

        public RoleController(RoleBusiness business)
        {
            _business = business;
        }
        #region Basic Operations

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Role>> GetById(int id)
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
        public async Task<ActionResult<Role>> Save(Role entity)
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
            var entity = new Role() { Id = id };
            var result = await _business.Delete(entity);
            return Ok(new { isDeleted = true });
        }
        #endregion

        [HttpGet("GetAllByRole")]
        public async Task<IActionResult> GetAllByRole()
        {
            var listData = await _business.GetAllByRole();
            return Ok(listData);
        }

        //[HttpGet("SearchByFilter")]
        //public async Task<ActionResult<BasePager<Role>>> SearchByFilter([FromQuery] ParamsEntity param)
        //{
        //    return Ok(await _business.SearchByFilter(param));
        //}
    }
}
