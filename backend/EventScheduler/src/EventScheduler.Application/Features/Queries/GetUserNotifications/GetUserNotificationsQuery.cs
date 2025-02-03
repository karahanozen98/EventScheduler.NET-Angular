using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Queries.GetUserNotifications
{
    public class GetUserNotificationsQuery : IQuery<IEnumerable<GetUserNotificationsResponseDto>>
    {

    }
}