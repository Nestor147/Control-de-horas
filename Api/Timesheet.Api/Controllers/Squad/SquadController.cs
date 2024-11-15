using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Timesheet.Business.Attendance;
using Timesheet.Entities.Attendance;

namespace Timesheet.Api.Controllers.Attendance
{
    public class SquadController : BaseApiController
    {
        private readonly SquadBusiness _squadBusiness;

        public SquadController(SquadBusiness squadBusiness)
        {
            _squadBusiness = squadBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<List<Squad>>> GetSquads()
        {
            try
            {
                var squads = await _squadBusiness.GetSquads();
                return Ok(squads);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetSquadNames")]
        public async Task<ActionResult<List<object>>> GetSquadNames()
        {
            try
            {
                var squadNames = await _squadBusiness.GetSquadNames();
                return Ok(squadNames);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetSquadNamesByEmails")]
        public async Task<IActionResult> GetSquadNamesByEmails()
        {
            var listData = await _squadBusiness.GetSquadNames();
            return Ok(listData);
        }
    }
}
