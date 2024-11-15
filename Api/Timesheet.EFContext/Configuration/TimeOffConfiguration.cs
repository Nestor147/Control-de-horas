using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities;

namespace Timesheet.EFContext.Configuration
{
    public class TimeOffConfiguration : IEntityTypeConfiguration<TimeOff>
    {
        public void Configure(EntityTypeBuilder<TimeOff> builder)
        {
            builder.Property(e => e.Id).HasColumnName("TimeOffId");
            builder.HasKey(e => e.Id);

           
            builder.Property(e => e.TimeOffType)
                   .IsRequired(); 

            builder.Property(e => e.InitialDateTime)
                   .IsRequired();

            builder.Property(e => e.EndDateTime)
                   .IsRequired();

            builder.Property(p => p.Justification)
                .HasMaxLength(500);  

            builder.Property(e => e.InitialCompensationDateTime)
                .IsRequired();

            builder.Property(e => e.EndCompensationDateTime)
                .IsRequired();

            builder.Property(e => e.RequestDate)
                .IsRequired();

            builder.Property(e => e.Active)
        .IsRequired();



            builder.HasOne(e => e.Employee)
                .WithMany(e => e.TimesOff)  
                .HasForeignKey(e => e.EmployeeId) 
                .IsRequired();  
        }
    }
}
