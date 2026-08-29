using Barsonomy.Api.Data;
using Barsonomy.Api.DTO;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Barsonomy.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly ApplicationDbContext _context;

    public DashboardService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryDto> GetDashboardDataAsync(string userId)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
            throw new InvalidOperationException("User not found");


   
        var userExpenses = await _context.Expenses
            .AsNoTracking()
            .Where(e => e.UserId == userId)
            .ToListAsync();

        var totalFixedCosts = userExpenses
            .Where(e => e.IsFixed && e.IsMonthly)
            .Sum(e => e.Amount);
        
        var totalSubscriptions = userExpenses
            .Where(e => !e.IsFixed && e.IsMonthly)
            .Sum(e => e.Amount);

        return new DashboardSummaryDto
        {
            MonthlyIncomeSek = user.MonthlyIncomeSek,
            BeerPriceSek = user.BeerPriceSek,
            TotalFixedCostsSek = totalFixedCosts,
            TotalSubscriptionsSek = totalSubscriptions
        };
    }
}