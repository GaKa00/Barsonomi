using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Barsonomy.Api.Data;

public class ApplicationUser : IdentityUser
{
    public decimal MonthlyIncomeSek { get; set; } = 25000m;

    [Range(1, 1000)]
    public decimal BeerPriceSek { get; set; } = 65m;

    public List<Expense> Expenses { get; set; } = new();
    public List<BeerTarget> Targets { get; set; } = new();
    public List<SubscriptionAlert> Alerts { get; set; } = new();
}

public class Category
{
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    public string Icon { get; set; } = "🍺";

    public List<Expense> Expenses { get; set; } = new();
}

public class Expense
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public decimal Amount { get; set; }
    public bool IsMonthly { get; set; } = true;
    public bool IsFixed { get; set; } = false; // Sant för hyra/mat, falskt för prenumerationer

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }

    public List<SubscriptionAlert> Alerts { get; set; } = new();
}

public class BeerTarget
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    public decimal TargetAmountSek { get; set; }
    public decimal CurrentSavedSek { get; set; }
    public DateTime TargetDate { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }
}

public class SubscriptionAlert
{
    public int Id { get; set; }
    public DateTime RenewalDate { get; set; }
    public bool IsDismissed { get; set; } = false;
    public string Note { get; set; } = string.Empty;

    public int ExpenseId { get; set; }
    public Expense? Expense { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }
}