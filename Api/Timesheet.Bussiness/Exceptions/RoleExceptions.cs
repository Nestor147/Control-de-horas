
using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class RoleNameEmptyExceptions : ParamsException
    {
        public RoleNameEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(RoleNameEmptyExceptions).FullName))
        {
        }
    }

    public class RoleDescriptionEmptyExceptions : ParamsException
    {
        public RoleDescriptionEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(RoleDescriptionEmptyExceptions).FullName))
        {
        }
    }

    public class RoleNameAlreadyExistsExceptions : ParamsException
    {
        public RoleNameAlreadyExistsExceptions(string name)
            : base(ExceptionMessageReader.GetMessage(typeof(RoleNameAlreadyExistsExceptions).FullName), name)
        {
        }
    }
}
