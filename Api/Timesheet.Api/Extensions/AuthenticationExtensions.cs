using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Graph.ExternalConnectors;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;
using Timesheet.Entities.Common;

namespace Timesheet.Api.Extensions
{

    public static class AuthenticationExtensions
    {
        private const string AZURE_CONFIG_SECTION = "AzureAdAuthn";
        private const string MS_GRAPH_CONFIG_SECTION = "MsGraph";

        public static IServiceCollection AddAzureAdAuthentication(this IServiceCollection services, IConfigurationRoot config)
        {
            services.Configure<DeviceConnection>(config.GetSection("DeviceConnection"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(
                    options =>
                    {
                        options.TokenValidationParameters.ValidAudiences = config.GetSection($"{AZURE_CONFIG_SECTION}:Audiences").Get<string[]>();
                        options.TokenValidationParameters.ValidateAudience = true;
                        options.TokenValidationParameters.ValidateIssuerSigningKey = true;
                        options.TokenValidationParameters.ValidateIssuer = true;
                        options.TokenValidationParameters.ValidateAudience = true;
                        options.TokenValidationParameters.ValidateLifetime = true;
                        options.TokenValidationParameters.RequireSignedTokens = true;
                        options.TokenValidationParameters.RequireExpirationTime = true;
                    },
                    options => { config.Bind(AZURE_CONFIG_SECTION, options); }
                )
                .EnableTokenAcquisitionToCallDownstreamApi(options => { config.Bind(AZURE_CONFIG_SECTION, options); })
                .AddMicrosoftGraph(config.GetSection(MS_GRAPH_CONFIG_SECTION))
                .AddInMemoryTokenCaches();

            IdentityModelEventSource.ShowPII = true;

            services.Configure<MicrosoftIdentityOptions>(config.GetSection(AZURE_CONFIG_SECTION));

            return services;
        }
    }
}
