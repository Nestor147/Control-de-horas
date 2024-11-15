using System;
using Timesheet.Bussiness.Exceptions;
using Timesheet.Helpers;

namespace Timesheet.Business.Exceptions
{
    public class AssetPermissionAssetEmptyExceptions : ParamsException
    {
        public AssetPermissionAssetEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetPermissionAssetEmptyExceptions).FullName))
        {
        }
    }

    public class AssetPermissionEntityEmptyExceptions : ParamsException
    {
        public AssetPermissionEntityEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetPermissionEntityEmptyExceptions).FullName))
        {
        }
    }

    public class AssetPermissionRoleEmptyExceptions : ParamsException
    {
        public AssetPermissionRoleEmptyExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetPermissionRoleEmptyExceptions).FullName))
        {
        }
    }

    public class AssetPermissionAssetEntityRoleAlreadyExistsExceptions : ParamsException
    {
        public AssetPermissionAssetEntityRoleAlreadyExistsExceptions()
            : base(ExceptionMessageReader.GetMessage(typeof(AssetPermissionAssetEntityRoleAlreadyExistsExceptions).FullName))
        {
        }
    }
}
