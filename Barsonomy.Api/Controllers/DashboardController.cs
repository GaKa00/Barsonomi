using Barsonomy.Api.DTO;
using Barsonomy.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Barsonomy.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        [HttpGet]
        public async Task<ActionResult<DashboardSummaryDto>> GetExpenses()
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var expenses = await _dashboardService.GetDashboardDataAsync(userId);

            return Ok(expenses);
        }

        [HttpPut]
        public async Task<ActionResult<DashboardSummaryDto>> UpdateSettings(UpdateDashboardSettingsDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            if (dto.MonthlyIncomeSek <= 0 || dto.BeerPriceSek <= 0)
                return BadRequest("Monthly income and beer price must be greater than zero.");

            var settings = await _dashboardService.UpdateDashboardSettingsAsync(userId, dto);
            return Ok(settings);
        }
    }
}
