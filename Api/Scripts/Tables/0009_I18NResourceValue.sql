GO
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'I18NResourceValue')
BEGIN
    CREATE TABLE I18NResourceValue
    (
        I18NResourceValueId INT IDENTITY(1,1) PRIMARY KEY,
        RegionCode VARCHAR(50),
        Value VARCHAR(MAX),
        I18NResourceId INT,
        FOREIGN KEY (I18NResourceId) REFERENCES I18NResource(I18NResourceId)
    );
END;
GO
