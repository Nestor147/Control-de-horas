CREATE FUNCTION [dbo].[fn_TimeOff]
(
    @Date DATETIME,
	@EmployeeId int
)
RETURNS NVARCHAR(15)
AS
BEGIN
 
DECLARE @TimeOff NVARCHAR(15) 
Select top 1 @TimeOff = 'Permiso' 
From TimeOff 
Where EmployeeId  = @EmployeeId 
and @Date BETWEEN InitialDateTime AND EndDateTime
    RETURN @TimeOff;
END;