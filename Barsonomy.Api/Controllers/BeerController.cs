using System.Security.Claims;
using Barsonomy.Api.DTOs;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barsonomy.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BeerController : ControllerBase
{
    private readonly IBeerService _beerService;

    public BeerController(IBeerService beerService)
    {
        _beerService = beerService;
    }

    [HttpGet]
    public async Task<ActionResult<BeerDto[]>> GetBeerGoals()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var beerGoals = await _beerService.GetBeerGoalsAsync(userId);

        return Ok(beerGoals);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BeerDto>> GetBeerGoal(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var beerGoal = await _beerService.GetBeerGoalAsync(id, userId);

        if (beerGoal == null)
            return NotFound();

        return Ok(beerGoal);
    }

    [HttpPost]
    public async Task<ActionResult<BeerDto>> CreateBeerGoal(CreateBeerDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var createdBeerGoal = await _beerService.CreateBeerGoalAsync(dto, userId);

        return CreatedAtAction(nameof(GetBeerGoal), new { id = createdBeerGoal.Id }, createdBeerGoal);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BeerDto>> UpdateBeerGoal(int id, BeerDto beerDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        if (id != beerDto.Id)
            return BadRequest("ID mismatch");

        try
        {
            var updatedBeerGoal = await _beerService.UpdateBeerGoalAsync(beerDto, userId);
            return Ok(updatedBeerGoal);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBeerGoal(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        try
        {
            await _beerService.DeleteBeerGoalAsync(id, userId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }
}

