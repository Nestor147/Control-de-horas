using System.Text.Json;
using Timesheet.Api.Helpers;
using Timesheet.Business.Exceptions;
using Timesheet.Bussiness.Modules;
using Timesheet.Entities;
using Timesheet.Interfaces;

namespace Timesheet.Api.Extensions
{
    public static class SessionExtensions
    {
        public static IApplicationBuilder ConfigureGlobalSession(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                SessionAccessor.GetContext(context).SetEmployeeInfo(context.User);

                await next.Invoke();
            });

            app.Use(async (context, next) =>
            {
                SessionAccessor.GetContext(context).SetFakeSessionData("GET ME");

                await next.Invoke();
            });

            return app;
        }
    }
}
