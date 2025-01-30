using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;

namespace EventScheduler.Application.Features.Queries.GetCalendarEventById
{
    public class GetCalendarEventByIdQueryHandler : IQueryHandler<GetCalendarEventByIdQuery, GetCalendarEventByIdResponseDto>
    {
        private readonly IGenericRepository<CalendarEvent> _calendarEventRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetCalendarEventByIdQueryHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this._calendarEventRepository = unitOfWork.GetRepository<CalendarEvent>();
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<GetCalendarEventByIdResponseDto> Handle(GetCalendarEventByIdQuery request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Guid.Parse(userClaim?.Value ?? string.Empty);
            var calendarEvent = await this._calendarEventRepository
                .FirstOrDefaultAsync(e => e.Id == request.Id && e.UserId == userId, cancellationToken);

            if (calendarEvent is null)
            {
                throw new NotFoundException($"{nameof(CalendarEvent)} is not found");
            }

            var result = new GetCalendarEventByIdResponseDto(
                id: calendarEvent.Id,
                title: calendarEvent.Title,
                description: calendarEvent.Description,
                startDate: calendarEvent.StartDate);

            return result;
        }
    }
}