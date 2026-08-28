using System.ComponentModel.DataAnnotations;

namespace Barsonomy.Api.DTOs;

public class CreateExpenseDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public bool IsMonthly { get; set; } = true;
    public bool IsFixed { get; set; }

    [Required]
    public int CategoryId { get; set; }
}

public class ExpenseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public bool IsMonthly { get; set; }
    public bool IsFixed { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
}