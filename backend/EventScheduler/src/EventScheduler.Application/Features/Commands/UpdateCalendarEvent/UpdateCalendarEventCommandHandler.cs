using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;

namespace EventScheduler.Application.Features.Commands.UpdateCalendarEvent
{
    public class UpdateCalendarEventCommandHandler : ICommandHandler<UpdateCalendarEventCommand, UpdateCalendarEventResponseDto>
    {
        private readonly IGenericRepository<CalendarEvent> _calendarEventRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateCalendarEventCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {

            this._calendarEventRepository = unitOfWork.GetRepository<CalendarEvent>();
            this._unitOfWork = unitOfWork;
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<UpdateCalendarEventResponseDto> Handle(UpdateCalendarEventCommand request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var hasUser = Guid.TryParse(userClaim, out var userId);

            if (!hasUser)
            {
                throw new UnAuthorizedException();
            }

            var calendarEvent = await this._calendarEventRepository.GetByIdAsync(request.Id, cancellationToken);

            if (calendarEvent is null)
            {
                throw new NotFoundException($"{nameof(CalendarEvent)} is not found");
            }

            calendarEvent.Title = request.Title;
            calendarEvent.Description = request.Description;
            calendarEvent.StartDate = request.StartDate;

            this._calendarEventRepository.Update(calendarEvent);
            await this._unitOfWork.SaveChangesAsync();
            return new UpdateCalendarEventResponseDto();
        }
    }
}