
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create FUNCTION [dbo].[fn_AttendanceDateTime]
(
    @Date DATETIME,
	@UserSystemId int
)
RETURNS DATETIME
AS
BEGIN
    DECLARE @ResultDate DATETIME;
    
    ;WITH Differences AS
    (
        SELECT
            AttendanceDateTime,
            ABS(DATEDIFF(MINUTE, @Date, AttendanceDateTime)) AS DifferenceMinutes
        FROM EmployeeAttendance
        WHERE YEAR(AttendanceDateTime) = YEAR(@Date)
            AND MONTH(AttendanceDateTime) = MONTH(@Date)
            AND DAY(AttendanceDateTime) = DAY(@Date)
            AND EmployeeId = @UserSystemId
    )
    
    SELECT TOP 1 @ResultDate = AttendanceDateTime
    FROM Differences
    ORDER BY DifferenceMinutes ASC;
    
    RETURN @ResultDate;
END;