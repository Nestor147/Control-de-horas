CREATE TABLE EmployeeScheduleType (
    EmployeeScheduleTypeId INT PRIMARY KEY IDENTITY(1,1),
    ScheduleTypeId INT NOT NULL,
    EmployeeId INT NOT NULL,
    InitialDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    FOREIGN KEY (ScheduleTypeId) REFERENCES ScheduleType(ScheduleTypeId),
    FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId)
);