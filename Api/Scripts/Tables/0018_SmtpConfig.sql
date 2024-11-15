CREATE TABLE SmtpConfig (
    SmtpConfigId INT PRIMARY KEY IDENTITY(1,1),
    HostName NVARCHAR(255) NOT NULL,
    Port INT NOT NULL,
    SenderEmail NVARCHAR(255) NOT NULL,
    SenderName NVARCHAR(255) NULL,
    UserName NVARCHAR(255) NOT NULL,
    UserPassword NVARCHAR(MAX) NOT NULL,
    IsSslEnabled BIT NOT NULL,
    ReplyList NVARCHAR(MAX) NULL
);
