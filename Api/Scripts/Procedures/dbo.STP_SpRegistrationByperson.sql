CREATE PROCEDURE [dbo].[SpRegistrationByperson]
			(	
				@InitialDate Date,
				@EndDate Date,
				@EmployeeId int
			)
AS
BEGIN


DECLARE @WorkDays TABLE
(
	EmployeeId int ,
	Date Date,
	DayWeek int,
	ScheduleTypeId int, 
	InitialTime Time,
	EndTime Time
)
			Declare @Day Date,
			@ScheduleTypeId int


			DECLARE DATESTYPE CURSOR FOR 

						 Select DayDate
						 From DaysOfTheYear 
						 WHERE DayDate BETWEEN @InitialDate AND @EndDate

				OPEN DATESTYPE
						FETCH NEXT FROM DATESTYPE INTO @Day
						WHILE @@FETCH_STATUS = 0
							BEGIN

							Select @ScheduleTypeId = ISNULL( (Select Top 1 ut.ScheduleTypeId 
																	From EmployeeScheduleType ut
																	Where ut.EmployeeId = @EmployeeId
																	and ut.InitialDate <= @Day
																		and ut.EndDate >= @Day), (Select Top 1 ut.ScheduleTypeId 
																									From EmployeeScheduleType ut
																									Where ut.EmployeeId = @EmployeeId
																									order by ut.InitialDate desc))


							insert into @WorkDays(EmployeeId, Date, DayWeek, ScheduleTypeId, InitialTime, EndTime)
							Select @EmployeeId, @Day, DATEPART(WEEKDAY, @Day), d.ScheduleTypeId, d.InitialTime, d.EndTime
							From DailySchedule d
							Where d.ScheduleTypeId = @ScheduleTypeId
							And d.DayEnum = (DATEPART(WEEKDAY, @Day) -1)
							
						FETCH NEXT FROM DATESTYPE INTO @Day
				END
			CLOSE DATESTYPE
			DEALLOCATE DATESTYPE

			Select w.EmployeeId
			,CONVERT(DATETIME, CONVERT(VARCHAR(10), w.Date, 120) + ' ' + CONVERT(VARCHAR(8),  w.InitialTime, 108), 120) AS CheckInIime
			,CONVERT(DATETIME, CONVERT(VARCHAR(10), w.Date, 120) + ' ' + CONVERT(VARCHAR(8),  w.EndTime, 108), 120) AS DepartureTime
			,dbo.fn_AttendanceDateTime(CONVERT(DATETIME, CONVERT(VARCHAR(10), w.Date, 120) + ' ' + CONVERT(VARCHAR(8),  w.InitialTime, 108), 120), w.EmployeeId) CheckInRecord 
			,dbo.fn_AttendanceDateTime(CONVERT(DATETIME, CONVERT(VARCHAR(10), w.Date, 120) + ' ' + CONVERT(VARCHAR(8),  w.EndTime, 108), 120), w.EmployeeId) CheckOutRecord 
			From @WorkDays w

END



