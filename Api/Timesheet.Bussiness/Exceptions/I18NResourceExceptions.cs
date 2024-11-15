

using Timesheet.Helpers;

namespace Timesheet.Bussiness.Exceptions
{
    public class TheNameOfTheResourceIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheResourceIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheResourceAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheResourceAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheResourceSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheResourceSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheResourceSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheResourceToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheResourceToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
