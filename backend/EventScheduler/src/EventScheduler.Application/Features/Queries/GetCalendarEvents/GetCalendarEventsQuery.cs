using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Queries.GetCalendarEvents
{
    public class GetCalendarEventsQuery : IQuery<IEnumerable<GetCalendarEventsResponseDto>>
    {

    }
}