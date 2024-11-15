using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Entities.Accesscontrol;

namespace Timesheet.EFContext.Configuration
{
    public class AssetPermissionConfiguration : IEntityTypeConfiguration<AssetPermission>
    {
        public void Configure(EntityTypeBuilder<AssetPermission> builder)
        {
            builder.ToTable("AccessControlAssetPermission");
            builder.Property(e => e.Id).HasColumnName("AssetPermissionId");
            builder.HasOne(a => a.Asset).WithMany().HasForeignKey(p => p.AssetId);
            builder.HasOne(r => r.Role).WithMany().HasForeignKey(p => p.RoleId);
        }
    }
}
