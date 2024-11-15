
using Timesheet.Bussiness.Modules;
using Timesheet.EFContext.Configuration;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.DataProtection;
using Timesheet.Api.Extensions;
using Timesheet.Api.Helpers;
using Newtonsoft.Json.Serialization;
using Timesheet.EFContext.Core;
using Microsoft.Graph.ExternalConnectors;
using Timesheet.Entities.Email;
using Timesheet.Entities.Common;

var builder = WebApplication.CreateBuilder(args);


var configuration = builder.Configuration;

// Add services to the container.
builder.Configuration.AddJsonFile("appsettings.json", true, true);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<TimesheetDBContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("defaultConnection"),
        sqlServerOptions => sqlServerOptions.CommandTimeout(300)
    )
);

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
}
);
builder.Services.AddDataProtection().SetApplicationName("AANS.net");


builder.Services.AddScoped(typeof(GlobalSession), provider =>
{
    var contextAccessor = provider.GetService<IHttpContextAccessor>() ?? throw new ArgumentNullException(nameof(IHttpContextAccessor));
    return SessionAccessor.GetContext(contextAccessor.HttpContext);
});


builder.Services.AddAzureAdAuthentication(configuration);
ApplicationModule.Modules(builder.Services);


builder.Services.AddCors(o => o.AddPolicy("AANS_CORS", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddHttpContextAccessor();
builder.Services.AddOptions();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AANS_CORS");

//bearer token validation
app.UseAuthentication();
app.UseAuthorization();
app.ConfigureGlobalSession();


//app.MapControllers().RequireAuthorization();
app.MapControllers();

app.Run();
