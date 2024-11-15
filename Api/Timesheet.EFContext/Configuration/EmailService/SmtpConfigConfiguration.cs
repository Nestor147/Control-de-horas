using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Entities.Email;

namespace Timesheet.EFContext.Configuration.EmailService
{
    public class SmtpConfigConfiguration : IEntityTypeConfiguration<SmtpConfig>
    {
        public void Configure(EntityTypeBuilder<SmtpConfig> builder)
        {
            builder.Property(e => e.Id).HasColumnName("SmtpConfigId");
            builder.HasKey(e => e.Id);

            builder.Property(e => e.HostName).IsRequired();
            builder.Property(e => e.Port).IsRequired();
            builder.Property(e => e.SenderEmail).IsRequired();
            builder.Property(e => e.UserName).IsRequired();
            builder.Property(e => e.UserPassword).IsRequired();
            builder.Property(e => e.IsSslEnabled).IsRequired();

            // Opcionalmente puedes hacer más configuraciones
        }
    }
}
