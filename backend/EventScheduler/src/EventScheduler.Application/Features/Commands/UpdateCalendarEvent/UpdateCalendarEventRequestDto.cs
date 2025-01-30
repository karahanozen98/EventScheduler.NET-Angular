namespace EventScheduler.Application.Features.Commands.UpdateCalendarEvent
{
    public class UpdateCalendarEventRequestDto
    {
        public required string Title { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
    }
}