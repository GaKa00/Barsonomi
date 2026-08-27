using Microsoft.AspNetCore.Mvc;

namespace Barsonomy.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BeerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
