
CREATE TABLE Holidays (
    HolidayId INT IDENTITY(1,1) PRIMARY KEY,
    HolidayDate DATE NOT NULL,  
    Description NVARCHAR(255) NOT NULL
);


