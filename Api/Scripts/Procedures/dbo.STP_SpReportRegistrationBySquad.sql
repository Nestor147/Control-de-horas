create PROCEDURE [dbo].[SpReportRegistrationBySquad]
(	
	@InitialDate Date,
	@EndDate Date,
	@Squad NVARCHAR(MAX) 
)
AS
BEGIN
 
DECLARE @WorkDaysByPerson TABLE
(
	EmployeeId int ,
	CheckInTime DateTime ,
	DepartureTime DateTime,
	CheckInRecord DateTime,
	CheckOutRecord DateTime
)
 
	DECLARE @UserSystemId int
 
	DECLARE REPORT CURSOR FOR
 
		SELECT e.EmployeeId
		FROM Squad s
		inner join Employee e on s.EmployeeId = e.EmployeeId
		Where s.Name = @Squad
 
 
	OPEN REPORT
	FETCH NEXT FROM REPORT INTO @UserSystemId
	WHILE @@FETCH_STATUS = 0
	BEGIN
		INSERT INTO @WorkDaysByPerson(EmployeeId, CheckInTime, DepartureTime, CheckInRecord, CheckOutRecord)
		EXEC SpRegistrationByperson @InitialDate, @EndDate , @UserSystemId
		FETCH NEXT FROM REPORT INTO @UserSystemId
	END
 
	CLOSE REPORT
	DEALLOCATE REPORT
 
SET LANGUAGE Spanish;
 
SELECT s.Name SquadName, w.EmployeeId, u.Name, 
		DATEPART(WEEK, w.CheckInTime) AS WeekNumber,
  	  DATENAME(WEEKDAY, w.CheckInTime) AS LiteralDay,
	  w.CheckInTime, w.CheckInRecord,  
      DATEDIFF(MINUTE, w.CheckInTime, w.CheckInRecord) AS CheckInDifferenceInMinutes,
       CASE 
		   WHEN w.CheckInRecord IS NULL THEN ISNULL(dbo.fn_TimeOff(w.CheckInTime ,u.EmployeeId), 'No Marco Entrada') 
		   WHEN DATEDIFF(MINUTE, w.CheckInTime, w.CheckInRecord) > 5 THEN 'Retraso'
		   WHEN DATEDIFF(MINUTE, w.CheckInTime, w.CheckInRecord) < -5 THEN 'Puntualidad'
		   ELSE 'Registro Ingreso'
	   END AS CheckInMessage,
	   w.DepartureTime, w.CheckOutRecord,  
	   DATEDIFF(MINUTE, w.DepartureTime, w.CheckOutRecord) AS CheckOutDifferenceInMinutes,
       CASE 
		   WHEN w.CheckOutRecord IS NULL THEN ISNULL(dbo.fn_TimeOff(w.DepartureTime, u.EmployeeId), 'No Marco Salida')
		   WHEN DATEDIFF(MINUTE, w.DepartureTime, w.CheckOutRecord) <= -2 THEN 'Salida Anticipada'
		   ELSE 'Registro Salida'
	   END AS CheckOutMessage
FROM @WorkDaysByPerson w
INNER JOIN Employee u ON w.EmployeeId = u.EmployeeId
INNER JOIN Squad s ON u.EmployeeId = s.EmployeeId and s.Name = @Squad
Order by u.Email, w.CheckInTime
END