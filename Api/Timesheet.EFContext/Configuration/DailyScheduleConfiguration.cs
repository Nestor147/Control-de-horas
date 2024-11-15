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
    public class DailyScheduleConfiguration : IEntityTypeConfiguration<DailySchedule>
    {
        public void Configure(EntityTypeBuilder<DailySchedule> builder)
        {
            builder.Property(e => e.Id).HasColumnName("DailyScheduleId");
            builder.HasKey(e => e.Id);

            builder.Property(e => e.DayEnum)
                .IsRequired();

            builder.Property(e => e.InitialTime)
                   .IsRequired();

            builder.Property(e => e.EndTime)
                   .IsRequired();

            builder.HasOne(e => e.ScheduleType)
                   .WithMany(d => d.DailySchedules)
                   .HasForeignKey(e=>e.ScheduleTypeId)
                   .IsRequired();
        }
    }
}
