using EventScheduler.Application.Features.Commands.DeleteNotification;
using EventScheduler.Application.Features.Queries.GetUserNotifications;
using EventScheduler.Core.Api;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventScheduler.Api.Controllers
{
    [Route("/api/v1/[Controller]")]
    [ApiController]
    public class NotificationController : ApiController
    {
        private readonly ISender _sender;

        public NotificationController(ISender sender)
        {
            this._sender = sender;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<GetUserNotificationsResponseDto>>>> Login(
            CancellationToken token)
        {
            var result = await this._sender.Send(new GetUserNotificationsQuery(), token);
            return this.Ok(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse>> Login(
            [FromRoute] Guid id,
            CancellationToken token)
        {
            await this._sender.Send(new DeleteNotificationCommand { Id = id }, token);
            return this.Ok();
        }
    }
}