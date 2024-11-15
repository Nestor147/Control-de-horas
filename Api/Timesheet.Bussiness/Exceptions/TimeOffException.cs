using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheTimeOffIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheTimeOffIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheTimeOffIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheTimeOffAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheTimeOffAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheTimeOffAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheTimeOffSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheTimeOffSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheTimeOffSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheTimeOffToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheTimeOffToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheTimeOffToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
