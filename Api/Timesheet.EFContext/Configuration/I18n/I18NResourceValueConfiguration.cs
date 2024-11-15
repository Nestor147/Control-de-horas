using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.I18n;

namespace Timesheet.EFContext.Configuration.I18n
{
    public class I18NResourceValueConfiguration : IEntityTypeConfiguration<I18NResourceValue>
    {
        public void Configure(EntityTypeBuilder<I18NResourceValue> builder)
        {
            builder.ToTable("I18NResourceValue");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id).HasColumnName("I18NResourceValueId");
            builder.Property(e => e.RegionCode).IsRequired().HasMaxLength(10);
            builder.Property(e => e.Value).IsRequired();
            builder.HasOne(e => e.I18NResource)
                .WithMany(g => g.I18NResourceValue)
                .HasForeignKey(e => e.I18NResourceId);
        }
    }
}
