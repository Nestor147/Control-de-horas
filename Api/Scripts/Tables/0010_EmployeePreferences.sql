GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EmployeePreferences]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[EmployeePreferences]
    (
        EmployeePreferencesId INT IDENTITY(1,1) NOT NULL,  
        EmployeeId INT NOT NULL,                    
        TopList INT NULL,
        MenuFavorite NVARCHAR(MAX) NULL,
        CONSTRAINT PK_EmployeePreferences PRIMARY KEY NONCLUSTERED (EmployeePreferencesId ASC)  -- Índice no clusterizado
    );
END
GO

-- Creación de la clave foránea para EmployeeId si no existe
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EmployeePreferences_Employee]'))
BEGIN
    ALTER TABLE [dbo].[EmployeePreferences] WITH CHECK ADD CONSTRAINT FK_EmployeePreferences_Employee 
    FOREIGN KEY (EmployeeId) REFERENCES [dbo].[Employee] (EmployeeId);
END
GO
