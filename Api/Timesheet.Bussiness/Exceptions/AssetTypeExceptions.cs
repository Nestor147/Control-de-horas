using System;
using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class AssetTypeNameEmptyExceptions : ParamsException
    {
        public AssetTypeNameEmptyExceptions()
             : base(ExceptionMessageReader.GetMessage(typeof(AssetTypeNameEmptyExceptions).FullName))
        {
        }
    }

    public class AssetTypeNameAlreadyExistsExceptions : ParamsException
    {
        public AssetTypeNameAlreadyExistsExceptions(string name)
            : base(ExceptionMessageReader.GetMessage(typeof(AssetTypeNameAlreadyExistsExceptions).FullName), name)
        {
        }
    }
}
