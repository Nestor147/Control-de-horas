using Timesheet.EFContext.Core;

namespace Timesheet.Api.Helpers
{
    public static class SessionAccessor
    {
        public static GlobalSession GetContext(HttpContext context)
        {
            if (context == null)
                return new GlobalSession();

            context.Items[GlobalSession.SESSION_CONTEXT] ??= new GlobalSession();

            return (GlobalSession)context.Items[GlobalSession.SESSION_CONTEXT];
        }
    }

}
