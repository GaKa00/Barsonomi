using Microsoft.AspNetCore.Mvc;

namespace Barsonomy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
