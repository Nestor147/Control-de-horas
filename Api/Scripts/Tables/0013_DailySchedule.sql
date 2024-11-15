CREATE TABLE DailySchedule (
    DailyScheduleId INT PRIMARY KEY IDENTITY(1,1),
    ScheduleTypeId INT NOT NULL,
    DayEnum INT NOT NULL,
    InitialTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    FOREIGN KEY (ScheduleTypeId) REFERENCES ScheduleType(ScheduleTypeId)
);