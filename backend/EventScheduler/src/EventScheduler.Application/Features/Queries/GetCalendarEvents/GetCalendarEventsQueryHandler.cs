using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EventScheduler.Application.Features.Queries.GetCalendarEvents
{
    public class GetCalendarEventsQueryHandler : IQueryHandler<GetCalendarEventsQuery, IEnumerable<GetCalendarEventsResponseDto>>
    {
        private readonly IGenericRepository<CalendarEvent> _calendarEventRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetCalendarEventsQueryHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this._calendarEventRepository = unitOfWork.GetRepository<CalendarEvent>();
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<GetCalendarEventsResponseDto>> Handle(GetCalendarEventsQuery request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Guid.Parse(userClaim?.Value ?? string.Empty);
            var calendarEvents = await this._calendarEventRepository
                .Where(e => e.UserId == userId)
                .OrderBy(e => e.StartDate)
                .ToListAsync(cancellationToken: cancellationToken);

            var result = calendarEvents.Select(e => new GetCalendarEventsResponseDto(
                id: e.Id,
                title: e.Title,
                description: e.Description,
                startDate: e.StartDate));

            return result;
        }
    }
}