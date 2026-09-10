using Barsonomy.Api.DTO;
using Barsonomy.Api.DTOs;

namespace Barsonomy.Api.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardSummaryDto> GetDashboardDataAsync(string userId);
        Task<DashboardSummaryDto> UpdateDashboardSettingsAsync(string userId, UpdateDashboardSettingsDto dto);
    }
}
