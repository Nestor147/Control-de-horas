using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheScheduleTypeIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheScheduleTypeIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheScheduleTypeIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheScheduleTypeAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheScheduleTypeAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheScheduleTypeAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheScheduleTypeSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheScheduleTypeSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheScheduleTypeSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheScheduleTypeToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheScheduleTypeToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheScheduleTypeToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
