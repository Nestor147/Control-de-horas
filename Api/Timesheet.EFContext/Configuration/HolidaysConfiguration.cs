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
    public class HolidaysConfiguration : IEntityTypeConfiguration<Holidays>
    {
        public void Configure(EntityTypeBuilder<Holidays> builder)
        {
            builder.Property(e => e.Id).HasColumnName("HolidayId");
            builder.HasKey(e => e.Id); 
            builder.Property(e => e.HolidayDate)
                   .IsRequired();  

            builder.Property(e => e.Description)
                   .IsRequired()
                   .HasMaxLength(255);  
        }
    }
}
