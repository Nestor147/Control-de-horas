create PROCEDURE [dbo].[SpReportRegistration]
(	
	@InitialDate Date,
	@EndDate Date,
	@EmployeeIds NVARCHAR(MAX) 
)
AS
BEGIN

DECLARE @WorkDaysByPerson TABLE
(
	EmployeeId int ,
	CheckInIime DateTime ,
	DepartureTime DateTime,
	CheckInRecord DateTime,
	CheckOutRecord DateTime
)

DECLARE @UserSystemId int
DECLARE @EmployeeIdList TABLE (EmployeeId INT)

INSERT INTO @EmployeeIdList (EmployeeId)
SELECT value
FROM STRING_SPLIT(@EmployeeIds, ',')

DECLARE REPORT CURSOR FOR 

SELECT EmployeeId
FROM @EmployeeIdList 

OPEN REPORT
FETCH NEXT FROM REPORT INTO @UserSystemId
WHILE @@FETCH_STATUS = 0
BEGIN
	INSERT INTO @WorkDaysByPerson(EmployeeId, CheckInIime, DepartureTime, CheckInRecord, CheckOutRecord)
	EXEC SpRegistrationByperson @InitialDate, @EndDate , @UserSystemId
	
	FETCH NEXT FROM REPORT INTO @UserSystemId
END

CLOSE REPORT
DEALLOCATE REPORT

SELECT w.EmployeeId, u.Email, w.CheckInIime, w.CheckInRecord,  
       DATEDIFF(MINUTE, w.CheckInIime, w.CheckInRecord) AS CheckInDifferenceInMinutes,
       CASE 
		   WHEN w.CheckInRecord IS NULL THEN 'No Marco Entrada'
		   WHEN DATEDIFF(MINUTE, w.CheckInIime, w.CheckInRecord) > 5 THEN 'Retraso'
		   WHEN DATEDIFF(MINUTE, w.CheckInIime, w.CheckInRecord) < -5 THEN 'Puntualidad'
		   ELSE 'Registro Ingreso'
	   END AS CheckInMessage,
	   w.DepartureTime, w.CheckOutRecord,  
	   DATEDIFF(MINUTE, w.DepartureTime, w.CheckOutRecord) AS CheckOutDifferenceInMinutes,
       CASE 
		   WHEN w.CheckOutRecord IS NULL THEN 'No Marco Salida'
		   WHEN DATEDIFF(MINUTE, w.DepartureTime, w.CheckOutRecord) <= -1 THEN 'Salida Anticipada'
		   ELSE 'Registro Salida'
	   END AS CheckOutMessage
FROM @WorkDaysByPerson w
INNER JOIN Employee u ON w.EmployeeId = u.EmployeeId

END


