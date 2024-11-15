
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.EFContext.Configuration
{
    public class AssetConfiguration : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.ToTable("AccessControlAsset");
            builder.Property(e => e.Id).HasColumnName("AssetId");
            builder.Property(p => p.Code).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Name).HasMaxLength(100);
            builder.Property(p => p.DisplayName).IsRequired().HasMaxLength(250);
            builder.HasOne(a => a.AssetType).WithMany().HasForeignKey(p => p.AssetTypeId);
            builder.Property(p => p.IsGlobal);
            builder.Property(p => p.GroupName).HasMaxLength(255);
        }
    }
}
