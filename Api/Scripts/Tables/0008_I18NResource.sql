GO
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'I18NResource')
BEGIN
    CREATE TABLE I18NResource
    (
        I18NResourceId INT IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(MAX),
        DefaultValue VARCHAR(MAX),
        I18NResourceGroupId INT,
        FOREIGN KEY (I18NResourceGroupId) REFERENCES I18NResourceGroup(I18NResourceGroupId)
    );
END;
GO