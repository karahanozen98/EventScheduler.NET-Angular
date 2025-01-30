using EventScheduler.Application.Features.Queries.Login;
using EventScheduler.Core.Api;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EventScheduler.Api.Controllers
{
    [Route("/api/v1/[Controller]")]
    [ApiController]
    public class AuthController : ApiController
    {
        private readonly ISender _sender;

        public AuthController(ISender sender)
        {
            this._sender = sender;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login(
            [FromBody] LoginRequestDto request,
            CancellationToken token)
        {
            var result = await this._sender.Send(new LoginQuery(request.Username, request.Password), token);
            return this.Ok(result);
        }
    }
}