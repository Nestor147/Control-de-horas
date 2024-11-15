GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AccessControlAssetPermission]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[AccessControlAssetPermission](
        AssetPermissionId INT IDENTITY(1,1) NOT NULL,
        AssetId INT NULL,
        EntityId INT NULL,
        RoleId INT NOT NULL,
        CONSTRAINT PK_PermissionId PRIMARY KEY NONCLUSTERED (AssetPermissionId ASC)
    );
END
GO