using Barsonomy.Api.Data;
using Barsonomy.Api.DTOs;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Barsonomy.Api.Services;

public class ExpenseService : IExpenseService
{
    private readonly ApplicationDbContext _context;

    public ExpenseService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto dto, string userId)
    {
        var category = await _context.Categories.FindAsync(dto.CategoryId)
            ?? throw new ArgumentException("Kategorin finns inte.");

        var expense = new Expense
        {
            Name = dto.Name,
            Amount = dto.Amount,
            Date = dto.Date,
            IsMonthly = dto.IsMonthly,
            IsFixed = dto.IsFixed,
            CategoryId = dto.CategoryId,
            UserId = userId
        };

        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

        return new ExpenseDto
        {
            Id = expense.Id,
            Name = expense.Name,
            Amount = expense.Amount,
            Date = expense.Date,
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = category.Name
        };
    }

    public async Task<ExpenseDto[]> GetExpensesAsync(string userId)
    {
        var currentMonthStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var priorRecurringExpenses = await _context.Expenses
            .Where(e => e.UserId == userId &&
                        (e.IsMonthly || e.IsFixed) &&
                        e.Date < currentMonthStart)
            .GroupBy(e => new { e.Name, e.CategoryId, e.IsMonthly, e.IsFixed })
            .Select(group => group.OrderByDescending(e => e.Date).First())
            .ToListAsync();

        var expiredExpenses = await _context.Expenses
            .Where(e => e.UserId == userId && e.Date < currentMonthStart)
            .ToListAsync();

        if (expiredExpenses.Count > 0)
        {
            _context.Expenses.RemoveRange(expiredExpenses);
        }

        var currentMonthRecurringKeys = await _context.Expenses
            .Where(e => e.UserId == userId &&
                        (e.IsMonthly || e.IsFixed) &&
                        e.Date >= currentMonthStart &&
                        e.Date < currentMonthStart.AddMonths(1))
            .Select(e => new { e.Name, e.CategoryId, e.IsMonthly, e.IsFixed })
            .ToListAsync();

        foreach (var recurringExpense in priorRecurringExpenses)
        {
            var alreadyApplied = currentMonthRecurringKeys.Any(key =>
                key.Name == recurringExpense.Name &&
                key.CategoryId == recurringExpense.CategoryId &&
                key.IsMonthly == recurringExpense.IsMonthly &&
                key.IsFixed == recurringExpense.IsFixed);

            if (alreadyApplied)
                continue;

            var day = Math.Min(
                recurringExpense.Date.Day,
                DateTime.DaysInMonth(currentMonthStart.Year, currentMonthStart.Month));
            _context.Expenses.Add(new Expense
            {
                Name = recurringExpense.Name,
                Amount = recurringExpense.Amount,
                Date = new DateTime(currentMonthStart.Year, currentMonthStart.Month, day),
                IsMonthly = recurringExpense.IsMonthly,
                IsFixed = recurringExpense.IsFixed,
                CategoryId = recurringExpense.CategoryId,
                UserId = userId
            });
        }

        if (expiredExpenses.Count > 0 || priorRecurringExpenses.Count > 0)
            await _context.SaveChangesAsync();

        var expenses = await _context.Expenses
            .Where(e => e.UserId == userId && e.Date >= currentMonthStart)
            .Include(e => e.Category)
            .OrderByDescending(e => e.Date)
            .ToListAsync();
        return expenses.Select(e => new ExpenseDto
        {
            Id = e.Id,
            Name = e.Name,
            Amount = e.Amount,
            Date = e.Date,
            IsMonthly = e.IsMonthly,
            IsFixed = e.IsFixed,
            CategoryId = e.CategoryId,
            CategoryName = e.Category?.Name ?? string.Empty
        }).ToArray();
    }

    public async Task<ExpenseDto?> GetExpenseAsync(int id, string userId)
    {
        var expense = await _context.Expenses
            .Include(e => e.Category)
            .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

        if (expense == null)
            return null;

        return new ExpenseDto
        {
            Id = expense.Id,
            Name = expense.Name,
            Amount = expense.Amount,
            Date = expense.Date,
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = expense.Category?.Name ?? string.Empty
        };
    }

    public async Task DeleteExpenseAsync(int expenseId, string userId)
    {
        var expense = await _context.Expenses
            .FirstOrDefaultAsync(e => e.Id == expenseId && e.UserId == userId);
        if (expense == null)
            throw new ArgumentException("Utgiften finns inte.");
        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();
    }

    public async Task<ExpenseDto> UpdateExpenseAsync(ExpenseDto expenseDto, string userId)
    {
        var expense = await _context.Expenses
            .FirstOrDefaultAsync(e => e.Id == expenseDto.Id && e.UserId == userId);
        if (expense == null)
            throw new ArgumentException("Utgiften finns inte.");

        var category = await _context.Categories.FindAsync(expenseDto.CategoryId)
            ?? throw new ArgumentException("Kategorin finns inte.");

        expense.Name = expenseDto.Name;
        expense.Amount = expenseDto.Amount;
        expense.Date = expenseDto.Date;
        expense.IsMonthly = expenseDto.IsMonthly;
        expense.IsFixed = expenseDto.IsFixed;
        expense.CategoryId = expenseDto.CategoryId;

        _context.Expenses.Update(expense);
        await _context.SaveChangesAsync();

        return new ExpenseDto
        {
            Id = expense.Id,
            Name = expense.Name,
            Amount = expense.Amount,
            Date = expense.Date,
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = category.Name
        };
    }
}