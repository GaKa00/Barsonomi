using System.Security.Claims;
using Barsonomy.Api.DTOs;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barsonomy.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExpenseController : ControllerBase
{
    private readonly IExpenseService _expenseService;

    public ExpenseController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }


    [HttpGet]
    public async Task<ActionResult<ExpenseDto[]>> GetExpenses()
    {

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var expenses = await _expenseService.GetExpensesAsync(userId);

        return Ok(expenses);
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseDto>> CreateExpense(CreateExpenseDto dto)
    {
       
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var createdExpense = await _expenseService.CreateExpenseAsync(dto, userId);

        return Ok(createdExpense);
    }

    [HttpPut]
    public async Task<ActionResult<ExpenseDto>> UpdateExpense(ExpenseDto expenseDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();
        var existingExpense = await _expenseService.GetExpenseAsync(expenseDto.Id, userId);
        if (existingExpense == null)
            return NotFound();
        var updatedExpense = await _expenseService.UpdateExpenseAsync(expenseDto);
        return Ok(updatedExpense);
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteExpense(int id)
    {

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var expense = await _expenseService.GetExpenseAsync(id, userId);

        if (expense == null)
            return NotFound();

        await _expenseService.DeleteExpenseAsync(expense);

        return Ok();
    }
}
