using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.I18n;

namespace Timesheet.EFContext.Configuration.I18n
{
    public class I18NResourceGroupConfiguration : IEntityTypeConfiguration<I18NResourceGroup>
    {
        public void Configure(EntityTypeBuilder<I18NResourceGroup> builder)
        {
            builder.ToTable("I18NResourceGroup");
            builder.Property(e => e.Id).HasColumnName("I18NResourceGroupId");
            builder.Property(e => e.Name).IsRequired().HasMaxLength(250);
        }
    }
}
