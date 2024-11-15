CREATE TABLE TimeOff (
    TimeOffId INT PRIMARY KEY IDENTITY(1,1),
    EmployeeId INT NOT NULL,
    TimeOffType INT NOT NULL,
    InitialDateTime DATETIME NOT NULL,
    EndDateTime DATETIME NOT NULL,
    Justification NVARCHAR(MAX),
	InitialCompensationDateTime DATETIME NOT NULL,
    EndCompensationDateTime DATETIME NOT NULL,
    RequestDate DATETIME NOT NULL,
    Active DATETIME NOT NULL,

    FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId)
);


