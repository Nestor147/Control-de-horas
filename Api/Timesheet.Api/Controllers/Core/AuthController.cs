using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;


namespace Timesheet.Api.Controllers.Core
{

    [Route("api/core/[controller]"), ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MicrosoftIdentityOptions _msIdentityOptions;

        public AuthController(IOptions<MicrosoftIdentityOptions> microsoftIdentityOptions)
        {
            _msIdentityOptions = microsoftIdentityOptions?.Value ?? throw new ArgumentNullException(nameof(microsoftIdentityOptions));
        }

        [HttpGet("config"), AllowAnonymous]
        public object GetAuthConfig() => Ok(new
        {
            instance = this._msIdentityOptions.Instance,
            tenantId = this._msIdentityOptions.TenantId,
            clientId = this._msIdentityOptions.ClientId,
            scope = this._msIdentityOptions.Scope
        });
    }

}
