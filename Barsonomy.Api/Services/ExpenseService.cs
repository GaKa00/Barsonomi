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
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = category.Name
        };
    }

    public async Task <ExpenseDto[]> GetExpensesAsync(string userId)
    {
        var expenses = await _context.Expenses
            .Where(e => e.UserId == userId)
            .Include(e => e.Category)
            .ToListAsync();
        return expenses.Select(e => new ExpenseDto
        {
            Id = e.Id,
            Name = e.Name,
            Amount = e.Amount,
            IsMonthly = e.IsMonthly,
            IsFixed = e.IsFixed,
            CategoryId = e.CategoryId,
            CategoryName = e.Category.Name
        }).ToArray();
    }

    public async Task<ExpenseDto?> GetExpenseAsync(int id, string userId)
    {
        var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

        if (expense == null)
            return null;

        return new ExpenseDto
        {
            Id = expense.Id,
            Name = expense.Name,
            Amount = expense.Amount,
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = expense.Category?.Name
        };
    }

    public async Task DeleteExpenseAsync(ExpenseDto expenseDto)
    {
        var expense = await _context.Expenses.FindAsync(expenseDto.Id);
        if (expense == null)
            throw new ArgumentException("Utgiften finns inte.");
        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();
    }

    public async Task<ExpenseDto> UpdateExpenseAsync(ExpenseDto expenseDto)
    {
        var expense = await _context.Expenses.FindAsync(expenseDto.Id);
        if (expense == null)
            throw new ArgumentException("Utgiften finns inte.");

        var category = await _context.Categories.FindAsync(expenseDto.CategoryId)
            ?? throw new ArgumentException("Kategorin finns inte.");

        expense.Name = expenseDto.Name;
        expense.Amount = expenseDto.Amount;
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
            IsMonthly = expense.IsMonthly,
            IsFixed = expense.IsFixed,
            CategoryId = expense.CategoryId,
            CategoryName = category.Name
        };
    }
}