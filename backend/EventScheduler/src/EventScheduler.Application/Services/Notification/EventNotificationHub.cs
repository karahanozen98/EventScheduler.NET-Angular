using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace EventScheduler.Application.Services.Notification
{
    public class EventNotificationHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> _userConnections = new();
        private readonly ILogger<EventNotificationHub> _logger;

        public EventNotificationHub(ILogger<EventNotificationHub> logger)
        {
            this._logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;

            // Ensure users are authenticated
            if (string.IsNullOrEmpty(userId))
            {
                return Task.CompletedTask;
            }

            _logger.LogInformation($"User: {userId} has connected. ConnectionId: {Context.ConnectionId}");
            _userConnections[userId] = Context.ConnectionId;
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.UserIdentifier;
            if (!string.IsNullOrEmpty(userId))
            {
                _userConnections.TryRemove(userId, out _);
            }

            this._logger.LogInformation($"User {userId} has disconnected. ConnectionId: {Context.ConnectionId}");
            return base.OnDisconnectedAsync(exception);
        }

        public static string? GetUserConnectionId(string userId)
        {
            return _userConnections.TryGetValue(userId, out var connectionId) ? connectionId : null;
        }
    }
}