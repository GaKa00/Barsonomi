using Barsonomy.Api.Data;
using Barsonomy.Api.Services;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);




builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionString"]));

builder.Services.AddOpenApi();

builder.Services.AddAuthentication();
builder.Services.AddAuthorizationBuilder();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
{

   options.User.RequireUniqueEmail = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    options.Password.RequiredLength = 6;
}).AddEntityFrameworkStores<ApplicationDbContext>();

// Register Services
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IBeerService, BeerService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference();
}

    app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<ApplicationUser>();
app.MapControllers();

app.Run();