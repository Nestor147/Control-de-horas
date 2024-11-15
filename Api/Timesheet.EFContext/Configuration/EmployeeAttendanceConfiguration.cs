using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities;

namespace Timesheet.EFContext.Configuration
{
    public class EmployeeAttendanceConfiguration : IEntityTypeConfiguration<EmployeeAttendance>
    {
        public void Configure(EntityTypeBuilder<EmployeeAttendance> builder)
        {
            builder.Property(e => e.Id).HasColumnName("EmployeeAttendanceId");
            builder.HasKey(e => e.Id);

            builder.Property(e => e.AttendanceDateTime).IsRequired();

          
            builder.HasOne(ea => ea.Employee)
                   .WithMany(e => e.EmployeeAttendances)
                   .HasForeignKey(e=>e.EmployeeId) 
                   .IsRequired();


        }

    }
}
