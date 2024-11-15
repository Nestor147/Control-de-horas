# Introduccion 
# Timesheet
Este sistema se conecta al dispositivo ZKTeco K40 para recuperar datos de usuarios y registros. Utiliza una arquitectura de capas y está construido con .NET 8 y Angular 18.

# Contenido

1. Características
2. Requisitos del sistema
3. Configuración del proyecto
4. Estructura de las rutas
5. Funcionamiento de la sincronización
6. Scripts de base de datos
7. Autenticación

# Características
1. Recuperación de datos del dispositivo ZKTeco K40.
2. Pantallas para gestionar asistencia, empleados, tiempos libres, tipos de horario, horarios de empleados, horario diario, días festivos, reportes de empleado, por equipo y vacaciones.
3. Sincronización de datos cada 5 minutos desde el dispositivo.
4. Funcionalidad de búsqueda para diferentes tipos de registros.


# Requisitos del sistema
1. Backend: .NET 8 con Entity Framework Core.
2. Frontend: Angular 18.
3. Conexión: IP y puerto del dispositivo ZKTeco K40 configurados en appsettings.json.
4. Puerto de API: 5000.
5. Puerto del Frontend: 4200.

# Configuración del proyecto
1. git clone https://sda-iatec.visualstudio.com/WorkItemTracking/_git/Timesheet
2. La configuración de autenticación y conexión con el dispositivo se encuentra en el archivo appsettings.json.
3. Asegúrate de que todos los paquetes y dependencias estén instalados
4. Ejecuta todos los scripts para la creación de las tablas según el orden del 1 al 19.
5. Ejecuta los procedimientos almacenados. Al ejecutar el procedimiento almacenado [dbo.STP_SpCreateDaysOfTheYear]  debes de pasarle un año
6. Ejecuta las funciones 
7. Actualice los empleados ejecutado los script que se encuentran en la carpeta [UpdateEmployees]
8. Ejecutar el script para generar el menu 
9. Levanta la API
10. realizar la instalacion de los paquetes de node_modules con [npm install --force]
11. Levanta el frontend 

# Estructura de las rutas
Estructura de Rutas del Sistema de Gestión de Registros
Este sistema cuenta con una serie de rutas que permiten la navegación y acceso a diferentes funcionalidades relacionadas con la gestión de registros. 

1. SearchEmployeeAttendanceComponent: Permite buscar la asistencia de empleados.
2. EmployeeComponent: Muestra los detalles de un empleado específico.
3. SearchEmployeeComponent: Facilita la búsqueda de empleados en el sistema.
4. TimeOffComponent: Muestra los detalles de un tiempo libre específico.
5. SearchTimeOffComponent: Permite buscar tiempos libres registrados.
6. SearchTimeOffByEmployeeComponent: Facilita la búsqueda de tiempos libres por empleado.
7. VacationComponent: Muestra los detalles de una solicitud de vacaciones específica.
8. SearchVacationComponent: Permite buscar solicitudes de vacaciones.
9. ScheduleTypeComponent: Muestra los detalles de un tipo de horario específico.
10. SearchScheduleTypeComponent: Facilita la búsqueda de tipos de horario.
11. EmployeeScheduleTypeComponent: Muestra los detalles del tipo de horario de un empleado específico.
12. SearchEmployeeScheduleTypeComponent: Permite buscar tipos de horario de empleados.
13. DailyScheduleComponent: Muestra los detalles de un horario diario específico.
14. SearchDailyScheduleComponent: Facilita la búsqueda de horarios diarios.
15. HolidaysComponent: Muestra los detalles de un día festivo específico.
16. SearchHolidaysComponent: Permite buscar días festivos registrados.
17. SearchEmployeeAttendanceReportComponent: Muestra un reporte de asistencia de empleados.
18. EmployeeAttendanceReportByEmployeeComponent: Muestra un reporte de asistencia filtrado por empleado.
19. EmployeeAttendanceReportBySquadComponent: Muestra un reporte de asistencia filtrado por escuadra.
20. (Redirect): Redirige a la selección de entidad.
21. (Redirect): Redirige a la página de pronóstico del clima en caso de ruta no encontrada.

# Funcionamiento de la sincronización
Las pantallas de Employee y Employee Attendance tienen un botón de sincronización que establece la conexión con el dispositivo. Una vez realizada la conexión, los datos se sincronizan automáticamente cada 5 minutos.

1. La pantalla de Employee tienen un botton [Connect to Device] 
2. La pantalla de Employee Ateendance tienen un botton [Connect to Device] 


# Scripts de base de datos
El orden de ejecución de cada script de base de datos está numerado, creando la base de datos y las tablas necesarias según las relaciones. En la carpeta de scripts encontrarás:

1. Scripts para la creación de tablas.
2. Procedimientos almacenados.
3. Funciones.

# Autenticación
La API está protegida por autenticación OAuth2 de Azure, por lo que es necesario tener un usuario autenticado para acceder a los endpoints.