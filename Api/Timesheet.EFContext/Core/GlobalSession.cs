using System.Globalization;
using System.Security.Claims;
using Timesheet.Entities;
using Timesheet.Entities.Common;

using Timesheet.Entities.Lites;

namespace Timesheet.EFContext.Core
{
    public class GlobalSession
    {
        public const string SESSION_CONTEXT = "TIMESHEET_API";
        public EmployeeProfile Employee { get; private set; }
        public string DefaultLanguage { get; private set; } = "pt-BR";
        //public EntityCultureInfo EntityCulture { get; private set; }
        public string FakeData { get; private set; }
        public bool IsEnableTranslation { get; private set; } = true;

        public void SetEmployeeInfo(ClaimsPrincipal EmployeeInfo)
        {
            this.Employee = EmployeeInfo.Claims.Any()
                ? new EmployeeProfile
                {
                    Employeename = EmployeeInfo.Claims.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value,
                    FirstName = EmployeeInfo.Claims.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")?.Value,
                    LastName = EmployeeInfo.Claims.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname")?.Value,
                    Email = EmployeeInfo.Claims.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn")?.Value,
                    PictureUrl = null,
                    Identity = EmployeeInfo.Claims.SingleOrDefault(x => x.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                }
                : null;
        }
        public void SetFakeSessionData(string fakedata)
        {
            this.FakeData = fakedata;
        }
    }
}
