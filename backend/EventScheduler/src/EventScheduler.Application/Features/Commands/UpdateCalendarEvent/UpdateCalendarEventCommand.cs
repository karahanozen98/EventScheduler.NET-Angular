
using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Commands.UpdateCalendarEvent
{
    public class UpdateCalendarEventCommand : ICommand<UpdateCalendarEventResponseDto>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }

        public UpdateCalendarEventCommand(Guid id, string title, string description, DateTime startDate)
        {
            this.Id = id;
            this.Title = title;
            this.Description = description;
            this.StartDate = startDate;
        }
    }
}