using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Errors;
using Timesheet.Business;
using Timesheet.Entities;

namespace Timesheet.Api.Controllers
{
    public class EmployeePreferencesController : BaseApiController
    {
        private readonly EmployeePreferencesBusiness _business;

        public EmployeePreferencesController(EmployeePreferencesBusiness business)
        {
            _business = business;
        }
        #region Basic Operations
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<EmployeePreferences>> GetById(int id)
        {
            var preferences = await _business.GetById(id);
            if (preferences == null)
                return NotFound(new CodeErrorResponse(404));
            return Ok(preferences);
        }

        [HttpPost("Save")]
        public async Task<ActionResult<EmployeePreferences>> Save(EmployeePreferences entity)
        {
            var EmployeeExists = await _business.EmployeeExists(entity.EmployeeId);
            if (!EmployeeExists)
            {
                return BadRequest(new CodeErrorResponse(400, "El EmployeeId proporcionado no existe."));
            }

            if (entity.Id == 0)
                await _business.Save(entity);
            else
                await _business.Update(entity);

            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var preferences = new EmployeePreferences() { Id = id };
            var result = await _business.Delete(preferences);
            return Ok(new { isDeleted = true });
        }
        #endregion
    }
}
