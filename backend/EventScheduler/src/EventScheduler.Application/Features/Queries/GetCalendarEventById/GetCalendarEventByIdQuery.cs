using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Queries.GetCalendarEventById
{
    public class GetCalendarEventByIdQuery : IQuery<GetCalendarEventByIdResponseDto>
    {
        public Guid Id { get; set; }

        public GetCalendarEventByIdQuery(Guid id)
        {
            this.Id = id;
        }
    }
}