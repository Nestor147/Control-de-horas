using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities;

namespace Timesheet.EFContext.Configuration
{
    public class VacationConfiguration : IEntityTypeConfiguration<Vacation>
    {
        public void Configure(EntityTypeBuilder<Vacation> builder)
        {
            builder.Property(e => e.Id).HasColumnName("VacationId");
            builder.HasKey(e => e.Id);

            builder.Property(e => e.InitialDate)
                   .IsRequired();

            builder.Property(e => e.EndDate)
                   .IsRequired();

            builder.Property(e => e.VacationType)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.HasOne(e => e.Employee)
               .WithMany(e => e.Vacations)  // Un empleado puede tener muchas vacaciones
               .HasForeignKey(e=>e.EmployeeId)
               .IsRequired();
        }
    }
}
