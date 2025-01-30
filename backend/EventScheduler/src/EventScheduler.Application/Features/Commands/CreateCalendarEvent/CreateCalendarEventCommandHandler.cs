using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;

namespace EventScheduler.Application.Features.Commands.CreateCalendarEvent
{
    public class CreateCalendarEventCommandHandler : ICommandHandler<CreateCalendarEventCommand, CreateCalendarEventResponseDto>
    {
        private readonly IGenericRepository<CalendarEvent> _calendarEventRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateCalendarEventCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {

            this._calendarEventRepository = unitOfWork.GetRepository<CalendarEvent>();
            this._unitOfWork = unitOfWork;
            this._httpContextAccessor = httpContextAccessor;
        }
        public async Task<CreateCalendarEventResponseDto> Handle(CreateCalendarEventCommand request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var hasUser = Guid.TryParse(userClaim, out var userId);

            if (!hasUser)
            {
                throw new UnAuthorizedException();
            }

            var calendarEvent = new CalendarEvent
            {
                Title = request.Title,
                Description = request.Description,
                StartDate = request.StartDate,
                UserId = userId
            };

            await this._calendarEventRepository.AddAsync(calendarEvent, cancellationToken);
            await this._unitOfWork.SaveChangesAsync();
            return new CreateCalendarEventResponseDto();
        }
    }
}