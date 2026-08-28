using Barsonomy.Api.DTOs;

namespace Barsonomy.Api.Services.Interfaces;

public interface IExpenseService
{
    Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto dto, string userId);
    Task <ExpenseDto[]> GetExpensesAsync(string userId);
    Task <ExpenseDto> GetExpenseAsync(int expenseId, string userId);
    Task<ExpenseDto> UpdateExpenseAsync(ExpenseDto expenseDto);
    Task DeleteExpenseAsync(ExpenseDto expenseDto);
   
}