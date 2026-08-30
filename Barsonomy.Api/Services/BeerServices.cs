using Barsonomy.Api.Data;
using Barsonomy.Api.DTOs;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Barsonomy.Api.Services;

public class BeerService : IBeerService
{
    private readonly ApplicationDbContext _context;

    public BeerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BeerDto[]> GetBeerGoalsAsync(string userId)
    {
        var beerTargets = await _context.BeerTargets
            .AsNoTracking()
            .Where(b => b.UserId == userId)
            .ToListAsync();

        return beerTargets.Select(b => new BeerDto
        {
            Id = b.Id,
            Title = b.Title,
            TargetAmountSek = b.TargetAmountSek,
            CurrentSavedSek = b.CurrentSavedSek,
            TargetDate = b.TargetDate
        }).ToArray();
    }

    public async Task<BeerDto?> GetBeerGoalAsync(int id, string userId)
    {
        var beerTarget = await _context.BeerTargets
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

        if (beerTarget == null)
            return null;

        return new BeerDto
        {
            Id = beerTarget.Id,
            Title = beerTarget.Title,
            TargetAmountSek = beerTarget.TargetAmountSek,
            CurrentSavedSek = beerTarget.CurrentSavedSek,
            TargetDate = beerTarget.TargetDate
        };
    }

    public async Task<BeerDto> CreateBeerGoalAsync(CreateBeerDto dto, string userId)
    {
        var beerTarget = new BeerTarget
        {
            Title = dto.Title,
            TargetAmountSek = dto.TargetAmountSek,
            CurrentSavedSek = 0,
            TargetDate = dto.TargetDate,
            UserId = userId
        };

        _context.BeerTargets.Add(beerTarget);
        await _context.SaveChangesAsync();

        return new BeerDto
        {
            Id = beerTarget.Id,
            Title = beerTarget.Title,
            TargetAmountSek = beerTarget.TargetAmountSek,
            CurrentSavedSek = beerTarget.CurrentSavedSek,
            TargetDate = beerTarget.TargetDate
        };
    }

    public async Task<BeerDto> UpdateBeerGoalAsync(BeerDto beerDto, string userId)
    {
        var beerTarget = await _context.BeerTargets
            .FirstOrDefaultAsync(b => b.Id == beerDto.Id && b.UserId == userId)
            ?? throw new ArgumentException("Beer target not found.");

        beerTarget.Title = beerDto.Title;
        beerTarget.TargetAmountSek = beerDto.TargetAmountSek;
        beerTarget.CurrentSavedSek = beerDto.CurrentSavedSek;
        beerTarget.TargetDate = beerDto.TargetDate;

        _context.BeerTargets.Update(beerTarget);
        await _context.SaveChangesAsync();

        return new BeerDto
        {
            Id = beerTarget.Id,
            Title = beerTarget.Title,
            TargetAmountSek = beerTarget.TargetAmountSek,
            CurrentSavedSek = beerTarget.CurrentSavedSek,
            TargetDate = beerTarget.TargetDate
        };
    }

    public async Task DeleteBeerGoalAsync(int id, string userId)
    {
        var beerTarget = await _context.BeerTargets
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId)
            ?? throw new ArgumentException("Beer target not found.");

        _context.BeerTargets.Remove(beerTarget);
        await _context.SaveChangesAsync();
    }
}
