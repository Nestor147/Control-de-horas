GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Employee]') AND type in (N'U'))
BEGIN
    CREATE TABLE Employee
    (
        EmployeeId INT UNIQUE, 
        Email NVARCHAR(50),
        Name NVARCHAR(100),
        Active BIT,
        RoleId INT
    );
END
GO