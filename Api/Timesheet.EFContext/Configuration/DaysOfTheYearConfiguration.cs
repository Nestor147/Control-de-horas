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
    public class DaysOfTheYearConfiguration : IEntityTypeConfiguration<DaysOfTheYear>
    {
        public void Configure(EntityTypeBuilder<DaysOfTheYear> builder)
        {

            builder.Property(e => e.Id).HasColumnName("DaysOfTheYearId");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.DayDate)
                   .IsRequired(); 
        }
    }
}
