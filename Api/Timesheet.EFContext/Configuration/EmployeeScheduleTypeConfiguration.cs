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
    public class EmployeeScheduleTypeConfiguration : IEntityTypeConfiguration<EmployeeScheduleType>
    {
        public void Configure(EntityTypeBuilder<EmployeeScheduleType> builder)
        {
            builder.Property(e => e.Id).HasColumnName("EmployeeScheduleTypeId");
            builder.HasKey(e => e.Id);

            builder.Property(e => e.InitialDate)
                   .IsRequired();

            builder.Property(e => e.EndDate)
                   .IsRequired();

            builder.HasOne(e => e.Employee)
                   //.WithMany()
                   .WithMany(e=>e.EmployeeScheduleTypes)
                   .HasForeignKey(e=>e.EmployeeId)
                   .IsRequired();

            builder.HasOne(e => e.ScheduleType)
                   //.WithMany()
                   .WithMany(e=>e.EmployeeScheduleTypes)
                   .HasForeignKey(e=>e.ScheduleTypeId)
                   .IsRequired();
        }
    }
}
