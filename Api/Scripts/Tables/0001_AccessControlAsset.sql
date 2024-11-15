GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AccessControlAsset]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[AccessControlAsset](
        AssetId INT IDENTITY(1,1) NOT NULL,
        Code NVARCHAR(100) NULL,
        Name NVARCHAR(100) NULL,
        DisplayName NVARCHAR(250) NOT NULL,
        AssetTypeId INT NULL,
        IsGlobal BIT NULL,
        GroupName NVARCHAR(255) NULL,
        IconClass NVARCHAR(255) NULL,
        RouterLink NVARCHAR(255) NULL,
        TranslationKey NVARCHAR(255) NULL,
        ParentAssetId INT NULL,
        ParentOrder INT NULL,
        ItemOrder INT NULL,
        isGroup BIT NULL,
        CONSTRAINT PK_el_accesscontrol_Asset PRIMARY KEY NONCLUSTERED (AssetId ASC)
    );

	    ALTER TABLE [dbo].[AccessControlAsset] WITH CHECK ADD CONSTRAINT FK_asset_assetType FOREIGN KEY (AssetTypeId)
    REFERENCES [dbo].[AccessControlAssetType] (AssetTypeId);

	   ALTER TABLE [dbo].[AccessControlAsset] WITH CHECK ADD CONSTRAINT FK_PARENT_ASSETID FOREIGN KEY (ParentAssetId)
    REFERENCES [dbo].[AccessControlAsset] (AssetId);
END
GO