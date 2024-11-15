using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class EmployeeEmailEmptyExceptions : ParamsException
    {
        public EmployeeEmailEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(EmployeeEmailEmptyExceptions).FullName))
        {
        }
    }
    public class EmployeeNameEmptyExceptions : ParamsException
    {
        public EmployeeNameEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(EmployeeNameEmptyExceptions).FullName))
        {
        }
    }
    public class EmployeeVerifyEmailEmptyExceptions : ParamsException
    {
        public EmployeeVerifyEmailEmptyExceptions(bool message) : base(message.ToString()) { }
    }

    public class EmployeeEmailAlreadyExistsExceptions : ParamsException
    {
        public EmployeeEmailAlreadyExistsExceptions(string email)
            : base(ExceptionMessageReader.GetMessage(typeof(EmployeeEmailAlreadyExistsExceptions).FullName), email)
        {
        }
    }
    public class EmployeeRolEmptyExceptions : ParamsException
    {
        public EmployeeRolEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(EmployeeRolEmptyExceptions).FullName))
        {
        }
    }
    public class EmployeeRolWithoutPermissionExceptions : ParamsException
    {
        public EmployeeRolWithoutPermissionExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(EmployeeRolWithoutPermissionExceptions).FullName))
        {
        }
    }

    public class EmailsInvalidsExceptions : ParamsException
    {
        public EmailsInvalidsExceptions(string email)
            : base(ExceptionMessageReader.GetMessage(typeof(EmailsInvalidsExceptions).FullName), email)
        {
        }
    }
}
