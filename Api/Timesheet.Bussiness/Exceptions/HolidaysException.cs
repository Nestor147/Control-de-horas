using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class TheNameOfTheHolidaysIsEmptyExceptions : ParamsException
    {
        public TheNameOfTheHolidaysIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheHolidaysIsEmptyExceptions).FullName))
        { }
    }

    public class TheNameOfTheHolidaysAlreadyExistsExceptions : ParamsException
    {
        public TheNameOfTheHolidaysAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheHolidaysAlreadyExistsExceptions).FullName))
        { }
    }

    public class TheHolidaysSearchedForDoesNotExistExceptions : ParamsException
    {
        public TheHolidaysSearchedForDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheHolidaysSearchedForDoesNotExistExceptions).FullName))
        { }
    }

    public class TheNameOfTheHolidaysToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheNameOfTheHolidaysToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheNameOfTheHolidaysToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
