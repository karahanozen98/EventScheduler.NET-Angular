namespace EventScheduler.Application.Features.Queries.GetCalendarEvents
{
    public class GetCalendarEventsResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }

        public GetCalendarEventsResponseDto(Guid id, string title, string description, DateTime startDate)
        {
            this.Id = id;
            this.Title = title;
            this.Description = description;
            this.StartDate = startDate;
        }
    }
}