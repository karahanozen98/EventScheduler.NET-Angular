namespace EventScheduler.Application.Features.Queries.GetCalendarEventById
{
    public class GetCalendarEventByIdResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }

        public GetCalendarEventByIdResponseDto(Guid id, string title, string description, DateTime startDate)
        {
            this.Id = id;
            this.Title = title;
            this.Description = description;
            this.StartDate = startDate;
        }
    }
}