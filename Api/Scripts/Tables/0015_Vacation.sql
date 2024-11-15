CREATE TABLE Vacation (
    VacationId INT PRIMARY KEY IDENTITY(1,1),
    EmployeeId INT NOT NULL,
    InitialDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    VacationType INT NOT NULL,
    Justification NVARCHAR(MAX),
    NumberOfDays INT NOT NULL,
    RequestDate DATETIME NOT NULL,
    FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId)
);
