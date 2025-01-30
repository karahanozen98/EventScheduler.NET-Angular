using EventScheduler.Infrastructure.Extensions;
using EventScheduler.Application.Extensions;
using EventScheduler.Infrastructure.Data;
using EventScheduler.Api.Middleware;
using EventScheduler.Core.Auth;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCQRS();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddApplicationDbContext(builder.Configuration);
builder.Services.AddValidatorsFromAssembly();
builder.Services.AddGenericRepository();
builder.Services.AddUnitOfWork();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
    dataSeeder.SeedData();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseCors(ops => ops.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.Run();