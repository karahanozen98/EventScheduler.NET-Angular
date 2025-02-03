using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Commands.DeleteNotification
{
    public class DeleteNotificationCommand : ICommand
    {
        public Guid Id { get; set; }
    }
}