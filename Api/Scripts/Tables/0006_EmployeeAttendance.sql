GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EmployeeAttendance]') AND type in (N'U'))
BEGIN
    CREATE TABLE EmployeeAttendance
    (
        EmployeeAttendanceId INT IDENTITY PRIMARY KEY,
        EmployeeId INT,
        AttendanceDateTime DATETIME,
        FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId)
    );
END
GO