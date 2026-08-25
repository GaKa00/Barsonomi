using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Barsonomy.Api.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<BeerTarget> BeerTargets => Set<BeerTarget>();
    public DbSet<SubscriptionAlert> Alerts => Set<SubscriptionAlert>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<SubscriptionAlert>()
        .HasOne(a => a.User)
        .WithMany(u => u.Alerts)
        .HasForeignKey(a => a.UserId)
        .OnDelete(DeleteBehavior.Restrict);



        builder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Boende & Fast", Icon = "🏠" },
            new Category { Id = 2, Name = "Mat & Dagligvaror", Icon = "🛒" },
            new Category { Id = 3, Name = "Streaming & Nöje", Icon = "🎬" },
            new Category { Id = 4, Name = "Mjukvara & Licenser", Icon = "💻" },
            new Category { Id = 5, Name = "Gym & Hälsa", Icon = "🏋️" }
        );
    }
}