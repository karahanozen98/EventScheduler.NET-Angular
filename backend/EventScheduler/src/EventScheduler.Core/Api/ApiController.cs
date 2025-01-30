using Microsoft.AspNetCore.Mvc;

namespace EventScheduler.Core.Api
{
    public class ApiController : ControllerBase
    {
        [NonAction]
        public ActionResult<ApiResponse<T>> Ok<T>(T value)
        {
            var response = new ApiResponse<T>(value);
            return base.Ok(response);
        }

        [NonAction]
        public new ActionResult<ApiResponse> Ok()
        {
            var response = new ApiResponse();
            return base.Ok(response);
        }
    }
}