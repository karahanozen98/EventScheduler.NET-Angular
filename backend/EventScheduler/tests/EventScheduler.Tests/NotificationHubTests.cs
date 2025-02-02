using EventScheduler.Application.Services.Notification;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Moq;

namespace EventScheduler.Tests
{
    [TestCaseOrderer("Namespace.CustomTestCaseOrderer", "AssemblyName")]
    public class NotificationHubTests
    {
        private readonly Mock<ILogger<EventNotificationHub>> _mockLogger;
        private readonly EventNotificationHub _hub;
        private List<string> LogMessages = [];
        private readonly string _connectionId = "connection-id";
        private readonly string _userId = "user-id";

        public NotificationHubTests()
        {
            // Mock ILogger
            this._mockLogger = new Mock<ILogger<EventNotificationHub>>();
            this._mockLogger.Setup(m => m.Log(
                It.IsAny<LogLevel>(),
                It.IsAny<EventId>(),
                It.IsAny<It.IsAnyType>(),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!
            )).Callback(new InvocationAction(invocation =>
            {
                var logLevel = (LogLevel)invocation.Arguments[0];
                var eventId = (EventId)invocation.Arguments[1];
                var state = invocation.Arguments[2];
                var exception = (Exception)invocation.Arguments[3];
                var formatter = invocation.Arguments[4];

                var invokeMethod = formatter.GetType().GetMethod("Invoke");
                var logMessage = invokeMethod!.Invoke(formatter, new[] { state, exception });
                this.LogMessages.Add((string)logMessage!);
            }));

            // Mock EventNotificationHub
            this._hub = new EventNotificationHub(this._mockLogger.Object);
        }

        [Fact]
        public async Task ShouldAddUserToConnections()
        {
            var mockContext = new Mock<HubCallerContext>();
            mockContext.Setup(c => c.ConnectionId).Returns(this._connectionId);
            mockContext.Setup(c => c.UserIdentifier).Returns(this._userId);
            this._hub.Context = mockContext.Object;
            await this._hub.OnConnectedAsync();
            var connectionId = EventNotificationHub.GetUserConnectionId(this._userId);
            Assert.Equal(this._connectionId, connectionId);
            Assert.Contains($"User: {this._userId} has connected. ConnectionId: {this._connectionId}", this.LogMessages);
        }

        [Fact]
        public async Task ShouldBeAbleToDisconnect()
        {
            var mockContext = new Mock<HubCallerContext>();
            mockContext.Setup(c => c.ConnectionId).Returns(this._connectionId);
            mockContext.Setup(c => c.UserIdentifier).Returns(this._userId);
            this._hub.Context = mockContext.Object;
            await this._hub.OnDisconnectedAsync(null);
            var connectionId = EventNotificationHub.GetUserConnectionId("user-id");
            Assert.Equal(this._connectionId, this._connectionId);
            Assert.Contains($"User {this._userId} has disconnected. ConnectionId: {this._connectionId}", this.LogMessages);
        }

        [Fact]
        public async Task ShouldReturnConnectionId()
        {
            var mockContext = new Mock<HubCallerContext>();
            mockContext.Setup(c => c.ConnectionId).Returns(this._connectionId);
            mockContext.Setup(c => c.UserIdentifier).Returns(this._userId);
            this._hub.Context = mockContext.Object;
            await this._hub.OnConnectedAsync();
            var connId = EventNotificationHub.GetUserConnectionId(this._userId);
            Assert.Equal(this._connectionId, connId);
        }
    }
}