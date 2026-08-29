using Barsonomy.Api.DTO;

namespace Barsonomy.Api.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto[]> GetCategoriesAsync(string userId);
    }
}
