using System.Security.Cryptography.X509Certificates;
using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Commands.CreateCalendarEvent
{
    public class CreateCalendarEventCommand : ICommand<CreateCalendarEventResponseDto>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }

        public CreateCalendarEventCommand(string title, string description, DateTime startDate)
        {
            this.Title = title;
            this.Description = description;
            this.StartDate = startDate;
        }
    }
}