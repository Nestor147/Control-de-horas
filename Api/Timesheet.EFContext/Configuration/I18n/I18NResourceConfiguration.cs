using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.I18n;

namespace Timesheet.EFContext.Configuration.I18n
{
    public class I18NResourceConfiguration : IEntityTypeConfiguration<I18NResource>
    {
        public void Configure(EntityTypeBuilder<I18NResource> builder)
        {
            builder.ToTable("I18NResource");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("I18NResourceId");
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.DefaultValue).IsRequired();
            builder.HasOne(e => e.I18NResourceGroup)
                   .WithMany(g => g.I18NResource)
                   .HasForeignKey(e => e.I18NResourceGroupId);
        }
    }
}
