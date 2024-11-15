using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.EFContext.Configuration
{
 
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.Property(e => e.Id).HasColumnName("EmployeeId");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Email)
             .IsRequired()
             .HasMaxLength(50);

            builder.Property(e => e.Name)
                  .IsRequired()
                  .HasMaxLength(100);

            builder.Property(e => e.Active)
                  .IsRequired();

            builder.HasOne(e => e.Role)
                  .WithMany()
                  .HasForeignKey(e=>e.RoleId)
                  .IsRequired();
        }
    }
}
