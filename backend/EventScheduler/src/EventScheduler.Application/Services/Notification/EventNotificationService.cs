using Microsoft.AspNetCore.SignalR;

namespace EventScheduler.Application.Services.Notification
{
    public class EventNotificationService
    {
        private readonly IHubContext<EventNotificationHub> _hubContext;

        public EventNotificationService(IHubContext<EventNotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendNotificationAsync(Guid userId, string message)
        {
            var connectionId = EventNotificationHub.GetUserConnectionId(userId.ToString());

            if (!string.IsNullOrEmpty(connectionId))
            {
                await this._hubContext.Clients
                    .Client(connectionId)
                    .SendAsync("ReceiveNotification", message);
            }
        }
    }
}