using Microsoft.Extensions.DependencyInjection;
using Timesheet.Business;
using Timesheet.Business.Attendance;
using Timesheet.Business.EmailService;
using Timesheet.Business.I18n;
using Timesheet.Business.Report;
using Timesheet.Bussiness.Accesscontrol;
using Timesheet.EFContext.Data;
using Timesheet.EFContext.Data.Accesscontrol;
using Timesheet.EFContext.Data.EmailService;
using Timesheet.EFContext.Data.I18n;
using Timesheet.EFContext.Procedures.Report;
using Timesheet.Interfaces;
using Timesheet.Interfaces.Email;
using Timesheet.Interfaces.I18n;

namespace Timesheet.Bussiness.Modules
{
    public static class ApplicationModule
    {
        public static IServiceCollection service { get; set; }
        public static IServiceCollection Modules(IServiceCollection services)
        {
            services.AddScoped<I18NResourceBusiness>();
            services.AddScoped<I18NResourceGroupBusiness>();
            services.AddScoped<I18NResourceValueBusiness>();
            services.AddSingleton<LastSyncDateSingleton>();
            services.AddSingleton<DeviceConnectionManager>();

            services.AddScoped<EmployeeAttendanceBusiness>();
        
            services.AddScoped<IEmployeeAttendanceData, EmployeeAttendanceData>();
            services.AddScoped<II18NResourceData, I18NResourceData>();
            services.AddScoped<II18NResourceGroupData, I18NResourceGroupData>();
            services.AddScoped<II18NResourceValueData, I18NResourceValueData>();

            services.AddScoped<AssetPermissionBusiness>();
            services.AddScoped<IAssetPermissionData, AssetPermissionData>();

            services.AddScoped<AssetBusiness>();
            services.AddScoped<IAssetData, AssetData>();

            services.AddScoped<AssetTypeBusiness>();
            services.AddScoped<IAssetTypeData, AssetTypeData>();
   
            services.AddScoped<EmployeeBusiness>();
            services.AddScoped<IEmployeeData, EmployeeData>();

            services.AddScoped<RoleBusiness>();
            services.AddScoped<IRoleData, RoleData>();
            services.AddScoped<EmployeePreferencesBusiness>();
            services.AddScoped<IEmployeePreferencesData, EmployeePreferencesData>();

            services.AddScoped<ScheduleTypeBusiness>();
            services.AddScoped<IScheduleTypeData, ScheduleTypeData>();

            services.AddScoped<EmployeeScheduleTypeBusiness>();
            services.AddScoped<IEmployeeScheduleTypeData, EmployeeScheduleTypeData>();

            services.AddScoped<DailyScheduleBusiness>();
            services.AddScoped<IDailyScheduleData, DailyScheduleData>();

            services.AddScoped<TimeOffBusiness>();
            services.AddScoped<ITimeOffData, TimeOffData>();

            services.AddScoped<VacationBusiness>();
            services.AddScoped<IVacationData, VacationData>();

            services.AddScoped<DaysOfTheYearBusiness>();
            services.AddScoped<IDaysOfTheYearData, DaysOfTheYearData>();


            services.AddScoped<HolidaysBusiness>();
            services.AddScoped<IHolidaysData, HolidaysData>();

            services.AddScoped<SmtpConfigServiceData>();
            services.AddScoped<IEmailService, EmailServiceBusiness>();

            services.AddHttpClient(); 
            services.AddScoped<SquadBusiness>();

            services.AddScoped<EmployeeAttendanceReportProcedure>();

            services.AddScoped<RpEmployeeAttendanceReport>();

            service = services;
            return services;
        }
    }
}
