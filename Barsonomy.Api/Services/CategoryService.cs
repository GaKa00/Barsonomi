using Barsonomy.Api.Data;
using Barsonomy.Api.DTO;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Barsonomy.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;

    public CategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CategoryDto[]> GetCategoriesAsync(string userId)
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

        var categories = await _context.Categories
            .AsNoTracking()
            .ToListAsync();

        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            Icon = c.Icon,
            ExpenseCount = userExpenses.Count(e => e.CategoryId == c.Id),
            TotalSum = userExpenses
                .Where(e => e.CategoryId == c.Id)
                .Sum(e => e.Amount)
        }).ToArray();
    }
}