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
    public class EmployeePreferencesConfiguration : IEntityTypeConfiguration<EmployeePreferences>
    {
        public void Configure(EntityTypeBuilder<EmployeePreferences> builder)
        {
            builder.Property(e => e.Id).HasColumnName("EmployeePreferencesId");
            builder.Property(m => m.EmployeeId);
            builder.Property(p => p.TopList);
        }
    }
}
