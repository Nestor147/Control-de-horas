using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.EFContext.Configuration
{
    public class AssetTypeConfiguration : IEntityTypeConfiguration<AssetType>
    {
        public void Configure(EntityTypeBuilder<AssetType> builder)
        {
            builder.ToTable("AccessControlAssetType");
            builder.Property(e => e.Id).HasColumnName("AssetTypeId");
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.IsContext);
        }
    }
}
