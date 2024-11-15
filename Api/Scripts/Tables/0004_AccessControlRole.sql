GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AccessControlRole]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[AccessControlRole](
        RoleId INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(250) NOT NULL,
        CONSTRAINT PK_RoleId PRIMARY KEY NONCLUSTERED (RoleId ASC)
    );
END
GO