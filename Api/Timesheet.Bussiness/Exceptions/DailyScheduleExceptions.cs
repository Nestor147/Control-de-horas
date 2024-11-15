using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheDailyScheduleIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheDailyScheduleIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDailyScheduleIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheDailyScheduleAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheDailyScheduleAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDailyScheduleAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheDailyScheduleSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheDailyScheduleSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheDailyScheduleSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheDailyScheduleToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheDailyScheduleToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDailyScheduleToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
