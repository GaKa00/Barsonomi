using Microsoft.AspNetCore.Mvc;

namespace Barsonomy.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}