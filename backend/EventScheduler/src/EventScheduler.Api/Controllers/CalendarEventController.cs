using EventScheduler.Application.Features.Commands.CreateCalendarEvent;
using EventScheduler.Application.Features.Commands.DeleteCalendarEvent;
using EventScheduler.Application.Features.Commands.UpdateCalendarEvent;
using EventScheduler.Application.Features.Queries.GetCalendarEventById;
using EventScheduler.Application.Features.Queries.GetCalendarEvents;
using EventScheduler.Core.Api;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventScheduler.Api.Controllers
{
    [Route("/api/v1/[Controller]")]
    [ApiController]
    [Authorize]
    public class CalendarEventController : ApiController
    {
        private readonly ISender _sender;

        public CalendarEventController(ISender sender)
        {
            this._sender = sender;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<GetCalendarEventsResponseDto>>>> GetCalendarEvents(
            CancellationToken cancellationToken)
        {
            var res = await this._sender.Send(new GetCalendarEventsQuery(), cancellationToken);
            return this.Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<CreateCalendarEventResponseDto>>> UpdateCalendarEvent(
            [FromBody] CreateCalendarEventRequestDto requestDto,
            CancellationToken cancellationToken)
        {
            var command = new CreateCalendarEventCommand(
                title: requestDto.Title,
                description: requestDto.Description,
                startDate: requestDto.StartDate);
            var res = await this._sender.Send(command, cancellationToken);
            return this.Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GetCalendarEventByIdResponseDto>>> GetCalendarEventById(
            [FromRoute] Guid id,
            CancellationToken cancellationToken)
        {
            var res = await this._sender.Send(new GetCalendarEventByIdQuery(id), cancellationToken);
            return this.Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<UpdateCalendarEventResponseDto>>> UpdateCalendarEvent(
            [FromRoute] Guid id,
            [FromBody] UpdateCalendarEventRequestDto requestDto,
            CancellationToken cancellationToken)
        {
            var command = new UpdateCalendarEventCommand(
                id: id,
                title: requestDto.Title,
                description: requestDto.Description,
                startDate: requestDto.StartDate);
            var res = await this._sender.Send(command, cancellationToken);
            return this.Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse>> DeleteCalendarEvent(
            [FromRoute] Guid id,
            CancellationToken cancellationToken)
        {
            await this._sender.Send(new DeleteCalendarEventCommand(id), cancellationToken);
            return this.Ok();
        }
    }
}