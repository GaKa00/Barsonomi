using Barsonomy.Api.DTOs;

namespace Barsonomy.Api.Services.Interfaces;

public interface IBeerService
{
    Task<BeerDto[]> GetBeerGoalsAsync(string userId);
    Task<BeerDto?> GetBeerGoalAsync(int id, string userId);
    Task<BeerDto> CreateBeerGoalAsync(CreateBeerDto dto, string userId);
    Task<BeerDto> UpdateBeerGoalAsync(BeerDto beerDto, string userId);
    Task DeleteBeerGoalAsync(int id, string userId);
}
