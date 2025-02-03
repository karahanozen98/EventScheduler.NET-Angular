namespace EventScheduler.Application.Features.Queries.GetUserNotifications
{
    public class GetUserNotificationsResponseDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = "";
        public bool HasRead { get; set; }
        public DateTime Date { get; set; }
    }
}