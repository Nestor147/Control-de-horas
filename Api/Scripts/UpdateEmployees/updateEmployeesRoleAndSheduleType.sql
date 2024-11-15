
Delete From EmployeeScheduleType
Delete From DailySchedule
Delete From ScheduleType

DBCC CHECKIDENT (EmployeeScheduleType, RESEED,1);
DBCC CHECKIDENT (DailySchedule, RESEED,1);
DBCC CHECKIDENT (ScheduleType, RESEED,1);

GO


SET IDENTITY_INSERT [dbo].[ScheduleType] ON 

INSERT [dbo].[ScheduleType] ([ScheduleTypeId], [Name]) VALUES (1, N'Personal Iatec 1:30 PM')
INSERT [dbo].[ScheduleType] ([ScheduleTypeId], [Name]) VALUES (2, N'Personal Iatec 2:00 PM')
INSERT [dbo].[ScheduleType] ([ScheduleTypeId], [Name]) VALUES (3, N'Limpieza')
INSERT [dbo].[ScheduleType] ([ScheduleTypeId], [Name]) VALUES (4, N'Presonal Iate-Br')
SET IDENTITY_INSERT [dbo].[ScheduleType] OFF
GO
SET IDENTITY_INSERT [dbo].[DailySchedule] ON 

INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (1, 1, 1, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (2, 1, 1, CAST(N'13:30:00' AS Time), CAST(N'17:15:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (3, 1, 2, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (4, 1, 2, CAST(N'13:30:00' AS Time), CAST(N'17:15:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (5, 1, 3, CAST(N'13:30:00' AS Time), CAST(N'17:15:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (6, 1, 3, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (7, 1, 4, CAST(N'13:30:00' AS Time), CAST(N'17:15:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (8, 1, 4, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (9, 1, 5, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (10, 2, 1, CAST(N'14:00:00' AS Time), CAST(N'17:45:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (11, 2, 1, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (12, 2, 2, CAST(N'14:00:00' AS Time), CAST(N'17:45:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (13, 2, 2, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (14, 2, 3, CAST(N'14:00:00' AS Time), CAST(N'17:45:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (15, 2, 3, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (16, 2, 4, CAST(N'14:00:00' AS Time), CAST(N'17:45:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (17, 2, 4, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (18, 2, 5, CAST(N'07:30:00' AS Time), CAST(N'12:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (19, 4, 1, CAST(N'12:00:00' AS Time), CAST(N'16:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (20, 4, 1, CAST(N'06:30:00' AS Time), CAST(N'11:00:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (21, 4, 2, CAST(N'12:00:00' AS Time), CAST(N'16:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (22, 4, 2, CAST(N'06:30:00' AS Time), CAST(N'11:00:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (23, 4, 3, CAST(N'12:00:00' AS Time), CAST(N'16:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (24, 4, 3, CAST(N'06:30:00' AS Time), CAST(N'11:00:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (25, 4, 4, CAST(N'12:00:00' AS Time), CAST(N'16:30:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (26, 4, 4, CAST(N'06:30:00' AS Time), CAST(N'11:00:00' AS Time))
INSERT [dbo].[DailySchedule] ([DailyScheduleId], [ScheduleTypeId], [DayEnum], [InitialTime], [EndTime]) VALUES (27, 4, 5, CAST(N'06:30:00' AS Time), CAST(N'11:00:00' AS Time))
SET IDENTITY_INSERT [dbo].[DailySchedule] OFF




GO
DECLARE @Employee TABLE
(EmployeeId int,
 Name nvarchar(200),
 RoleId int,
 Active int,
 Email nvarchar(250)
)

INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (1, N'Victor Chuquimia', 3, 1, N'victor.chuquimia@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (2, N'JHONY CALLE', 1, 1, N'jhony.calle@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (3, N'Jony Montero', 1, 1, N'jony.montero@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (4, N'ROSMERY BARJA', 1, 0, N'isabel.barja@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (5, N'ORLANDO CARI', 1, 1, N'orlando.cari@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (6, N'Fausto  Aquino', 1, 1, N'alfonso.aquino@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (7, N'Tito Alvarez', 1, 0, N'')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (8, N'MOISES RODRIGUEZ', 1, 1, N'moises.rodriguez@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (9, N'DENNER LLANOS', 1, 1, N'denner.perez@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (10, N'Saul 32', 1, 1, N'saul.mamani@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (11, N'SAMUEL CARI', 1, 1, N'samuel.cari@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (12, N'HECTOR VELEZ', 1, 1, N'hector.velez@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (13, N'DAVID BLANCO', 1, 1, N'david.blanco@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (14, N'RobertoMarca 29', 1, 1, N'roberto.marca@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (15, N'Elnar Alvarez', 1, 1, N'elnar.alvarez@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (16, N'Alan Ibaٌez', 1, 1, N'alan.ibanez@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (17, N'ABEL ORTIZ', 1, 1, N'abel.ortiz@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (18, N'JUDITH VILLANUEVA', 1, 1, N'judith.villanueva@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (19, N'RONY CASTILLO', 1, 1, N'rony.castillo@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (20, N'Nestor', 3, 1, N'nestor.villca@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (21, N'Sergio Llempen', 1, 1, N'sergio.llempen@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (22, N'HECTOR COPA', 1, 1, N'hector.copa@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (23, N'Amilcar Cayllante', 1, 1, N'jose.cayllante@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (24, N'AMED TANCARA', 1, 1, N'amed.tancara@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (25, N'Ruben Alberto', 1, 1, N'ruben.alberto@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (26, N'Yhens 4', 1, 0, N'')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (27, N'OscarQ Quisbert', 1, 1, N'oscar.quisbert@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (28, N'DilanCh CH', 1, 1, N'dilan.chuquimia@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (29, N'Josue Huarachi', 1, 1, N'josue.huarachi@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (30, N'Joel Bazan', 1, 1, N'joel.bazan@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (31, N'Andrea Mamani', 1, 1, N'')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (32, N'Rodrigo', 1, 1, N'rodrigo.navarro@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (33, N'Jose', 1, 1, N'jose.calderon@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (34, N'Elmer 34', 1, 1, N'elmer.soliz@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (35, N'IATec 1', 3, 0, N'20171844')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (36, N'Marco', 1, 1, N'marco.aguilar@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (37, N'Daniel', 1, 1, N'daniel.camacho@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (38, N'Christ', 1, 1, N'christopher.arce@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (39, N'RubenMam', 3, 1, N'ruben.valencia@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (40, N'OrladoChoqe', 1, 1, N'orlando.choque@iatec.com')
INSERT @Employee ([EmployeeId], [Name], [RoleId], [Active], [Email]) VALUES (41, N'Karla Choque', 1, 1, N'karla.choque@iatec.com')

Insert into @Employee (Email, Name, Active, RoleId ) Values ( 'karla.choque@iatec.com',   'Karla Choque',1,1)

update e
set Name = a.Name,
RoleId = a.RoleId,
Active = a.RoleId,
Email = a.Email
from 
Employee e 
inner join @Employee a on e.EmployeeId = a.EmployeeId




insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,41,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,22,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,12,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,3,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,21,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,6,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,13,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,5,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,11,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,9,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,10,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,17,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,19,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,40,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (1,31,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,8,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,14,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,23,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,24,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,15,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,30,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,37,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,25,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,2,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,16,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,20,'01/01/2024','12/31/2024')
insert into EmployeeScheduleType (ScheduleTypeId, EmployeeId, InitialDate, EndDate) values (2,33,'01/01/2024','12/31/2024')
