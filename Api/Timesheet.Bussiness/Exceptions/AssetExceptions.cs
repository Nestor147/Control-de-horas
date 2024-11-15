using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class AssetCodeEmptyExceptions : ParamsException
    {
        public AssetCodeEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetCodeEmptyExceptions).FullName))
        {
        }
    }

    public class AssetDisplayNameEmptyExceptions : ParamsException
    {
        public AssetDisplayNameEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetDisplayNameEmptyExceptions).FullName))
        {
        }
    }

    public class AssetAssetTypeEmptyExceptions : ParamsException
    {
        public AssetAssetTypeEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetAssetTypeEmptyExceptions).FullName))
        {
        }
    }

    public class AssetCodeAlreadyExistsExceptions : ParamsException
    {
        public AssetCodeAlreadyExistsExceptions(string code)
            : base(ExceptionMessageReader.GetMessage(typeof(AssetCodeAlreadyExistsExceptions).FullName), code)
        {
        }
    }
}
