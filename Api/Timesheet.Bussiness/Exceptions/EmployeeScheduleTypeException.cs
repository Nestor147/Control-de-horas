using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheEmployeeScheduleTypeIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheEmployeeScheduleTypeIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheEmployeeScheduleTypeIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheEmployeeScheduleTypeAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheEmployeeScheduleTypeAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheEmployeeScheduleTypeAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheEmployeeScheduleTypeSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheEmployeeScheduleTypeSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheEmployeeScheduleTypeSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheEmployeeScheduleTypeToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheEmployeeScheduleTypeToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheEmployeeScheduleTypeToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
