using Timesheet.Helpers;

namespace Timesheet.Bussiness.Exceptions
{
    public class TheNameOfTheResourceValueIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheResourceValueIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceValueIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheResourceValueAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheResourceValueAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceValueAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheResourceValueSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheResourceValueSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheResourceValueSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheResourceValueToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheResourceValueToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheResourceValueToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
