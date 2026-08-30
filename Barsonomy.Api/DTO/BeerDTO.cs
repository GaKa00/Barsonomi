using System.ComponentModel.DataAnnotations;

namespace Barsonomy.Api.DTOs;

public class CreateBeerDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public decimal TargetAmountSek { get; set; }

    public DateTime TargetDate { get; set; }
}

public class BeerDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal TargetAmountSek { get; set; }
    public decimal CurrentSavedSek { get; set; }
    public DateTime TargetDate { get; set; }
}
