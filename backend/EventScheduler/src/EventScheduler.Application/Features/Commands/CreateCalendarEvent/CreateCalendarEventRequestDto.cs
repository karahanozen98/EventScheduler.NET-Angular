namespace EventScheduler.Application.Features.Commands.CreateCalendarEvent
{
    public class CreateCalendarEventRequestDto
    {
        public required string Title { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
    }
}