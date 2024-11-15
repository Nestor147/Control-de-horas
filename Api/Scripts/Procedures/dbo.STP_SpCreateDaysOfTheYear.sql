CREATE PROCEDURE [dbo].[SpCreateDaysOfTheYear]
			(	
				 @year nvarchar(4)
			)
AS
BEGIN

DECLARE @StartDate DATE = @year+'-01-01';
DECLARE @EndDate DATE = @year+'-12-31';



IF NOT EXISTS (Select top 1 * from DaysOfTheYear  Where Year(DayDate) = @year)
BEGIN
	WHILE @StartDate <= @EndDate
	BEGIN
		INSERT INTO DaysOfTheYear (DayDate)
		VALUES (@StartDate);
    
		SET @StartDate = DATEADD(DAY, 1, @StartDate);
	END

END


	
END


