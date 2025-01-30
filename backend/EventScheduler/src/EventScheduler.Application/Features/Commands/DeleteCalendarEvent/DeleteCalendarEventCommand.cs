using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Commands.DeleteCalendarEvent
{
    public class DeleteCalendarEventCommand : ICommand
    {
        public Guid Id { get; set; }

        public DeleteCalendarEventCommand(Guid id)
        {
            this.Id = id;
        }
    }
}