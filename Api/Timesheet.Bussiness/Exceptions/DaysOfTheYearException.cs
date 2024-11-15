using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheDaysOfTheYearIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheDaysOfTheYearIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDaysOfTheYearIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheDaysOfTheYearAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheDaysOfTheYearAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDaysOfTheYearAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheDaysOfTheYearSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheDaysOfTheYearSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheDaysOfTheYearSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheDaysOfTheYearToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheDaysOfTheYearToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheDaysOfTheYearToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
