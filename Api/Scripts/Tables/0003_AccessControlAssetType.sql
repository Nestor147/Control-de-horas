GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AccessControlAssetType]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[AccessControlAssetType](
        AssetTypeId INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        IsContext BIT NOT NULL,
        CONSTRAINT PK_el_accesscontrol_AssetType PRIMARY KEY NONCLUSTERED (AssetTypeId ASC)
    );
END
GO
