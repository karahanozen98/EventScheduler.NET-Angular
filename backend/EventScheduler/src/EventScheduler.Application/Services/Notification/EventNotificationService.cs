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

        public async Task SendMultipleNotificationsAsync(string[] userIds, string message)
        {
            foreach (var id in userIds)
            {
                await this.SendNotificationAsync(id, message);
            }
        }

        public async Task SendNotificationAsync(string userId, string message)
        {
            var connectionId = EventNotificationHub.GetUserConnectionId(userId);

            if (!string.IsNullOrEmpty(connectionId))
            {
                await this._hubContext.Clients
                    .Client(connectionId)
                    .SendAsync("ReceiveNotification", message);
            }
        }
    }
}