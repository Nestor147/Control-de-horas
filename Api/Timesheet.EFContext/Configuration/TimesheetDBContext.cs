using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Reflection;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Entities.Email;
using Timesheet.Entities.I18n;
using Timesheet.Entities.Lites;
using Timesheet.Entities.Reports;
namespace Timesheet.EFContext.Configuration
{
    public class TimesheetDBContext: DbContext
    {

        public ILogger<TimesheetDBContext> _logger;
        public TimesheetDBContext(DbContextOptions<TimesheetDBContext> options, ILogger<TimesheetDBContext> logger) : base(options)
        {
            _logger = logger;
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<EmployeeAttendance> EmployeeAttendance { get; set; }
        
        public DbSet<I18NResourceGroup> I18NResourceGroup { get; set; }
        public DbSet<I18NResource> I18NResource { get; set; }
        public DbSet<I18NResourceValue> I18NResourceValue { get; set; }

        public DbSet<AssetPermissionLites> AssetPermissionLites { get; set; }
        public DbSet<AssetType> AssetType { get; set; }
        public DbSet<MenuItemModel> MenuItemModel { get; set; }
        public DbSet<Role> Role { get; set; }
     
        public DbSet<Asset> Asset { get; set; }
        public DbSet<AssetPermission> AssetPermission { get; set; }

  
        public DbSet<AccessControlRoleReport> AccessControlRoleReport { get; set; }

        public DbSet<EmployeePreferences> EmployeePreferences { get; set; }

        public DbSet<EmployeeField> EmployeeField { get; set; }

        public DbSet<AssetLite> AssetLite { get; set; }

        public DbSet<ScheduleType> ScheduleType { get; set; }
        public DbSet<EmployeeScheduleType> EmployeeScheduleType { get; set; }
        public DbSet<DailySchedule> DailySchedule { get; set; }
        public DbSet<TimeOff> TimeOff { get; set; }
        public DbSet<Vacation> Vacation { get; set; }
        public DbSet<DaysOfTheYear> DaysOfTheYear { get; set; }
        public DbSet<Holidays> Holidays { get; set; }

        public DbSet<SmtpConfig> SmtpConfig { get; set; }

        public DbSet<EmployeeAttendanceReport> EmployeeAttendanceReport { get; set; }
        public DbSet<SquadAttendanceReport> SquadAttendanceReport { get; set; }

      

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EmployeeAttendanceReport>().HasNoKey();

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }



    }
}
