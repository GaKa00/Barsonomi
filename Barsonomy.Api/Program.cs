using Barsonomy.Api.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);




builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionString"]));

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
   
    app.MapScalarApiReference();
}

    app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();