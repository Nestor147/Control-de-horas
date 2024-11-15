
using Timesheet.Helpers;

namespace Timesheet.Bussiness.Exceptions
{
    public class ResourceNameIsEmptyExceptions : ParamsException
    {
        public ResourceNameIsEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(ResourceNameIsEmptyExceptions).FullName))
        { }



    }

    public class TheResourceGroupDoesNotExistExceptions : ParamsException
    {
        public TheResourceGroupDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheResourceGroupDoesNotExistExceptions).FullName))
        { }
    }

    public class ResourceGroupAlreadyExistsExceptions : ParamsException
    {
        public ResourceGroupAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(ResourceGroupAlreadyExistsExceptions).FullName))
        { }
    }


    public class TheResourceGroupToBeDeletedDoesNotExistExceptions : ParamsException
    {
        public TheResourceGroupToBeDeletedDoesNotExistExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(TheResourceGroupToBeDeletedDoesNotExistExceptions).FullName))
        { }
    }
}
