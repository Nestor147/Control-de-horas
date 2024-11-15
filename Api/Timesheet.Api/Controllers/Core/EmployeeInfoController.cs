using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Timesheet.EFContext.Core;

namespace Timesheet.Api.Controllers.Core
{

    [Route("api/core/[controller]"), ApiController]
    public class EmployeeInfoController : ControllerBase
    {
        private readonly GlobalSession _globalSession;
        private readonly GraphServiceClient _mGraphServiceClient;

        public EmployeeInfoController(GlobalSession globalSession, GraphServiceClient msGraphServiceClient)
        {
            _globalSession = globalSession ?? throw new ArgumentNullException(nameof(globalSession));
            _mGraphServiceClient = msGraphServiceClient ?? throw new ArgumentNullException(nameof(msGraphServiceClient));
        }

        [HttpGet("me"), AllowAnonymous]
        public async Task<IActionResult> GetAuthConfig()
        {
            try
            {
                await using var photoStream = await _mGraphServiceClient.Me.Photo.Content.Request().GetAsync();
                this._globalSession.Employee.PictureUrl = $"data:image/jpeg;base64,{Convert.ToBase64String(((MemoryStream)photoStream).ToArray())}";
            }
            catch (Exception)
            {
                this._globalSession.Employee.PictureUrl = null;
            }

            return Ok(this._globalSession.Employee);
        }
    }

}
