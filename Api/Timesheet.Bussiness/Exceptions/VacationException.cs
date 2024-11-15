using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheVacationIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheVacationIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheVacationIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheVacationAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheVacationAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheVacationAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheVacationSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheVacationSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheVacationSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheVacationToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheVacationToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheVacationToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
