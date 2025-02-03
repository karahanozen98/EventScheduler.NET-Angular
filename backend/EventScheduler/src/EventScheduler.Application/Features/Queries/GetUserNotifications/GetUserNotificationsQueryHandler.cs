using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EventScheduler.Application.Features.Queries.GetUserNotifications
{
    public class GetUserNotificationsQueryHandler : IQueryHandler<GetUserNotificationsQuery, IEnumerable<GetUserNotificationsResponseDto>>
    {
        private readonly IGenericRepository<Notification> _notificationRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetUserNotificationsQueryHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this._notificationRepository = unitOfWork.GetRepository<Notification>();
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<GetUserNotificationsResponseDto>> Handle(GetUserNotificationsQuery request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Guid.Parse(userClaim?.Value ?? string.Empty);
            var notifications = await this._notificationRepository
                .Where(e => e.UserId == userId)
                .OrderByDescending(e => e.CreatedAt)
                .Select(e => new { e.Id, e.Message, e.HasRead, e.CreatedAt })
                .ToListAsync();

            return notifications
                .Select(notification => new GetUserNotificationsResponseDto
                {
                    Id = notification.Id,
                    Message = notification.Message,
                    HasRead = notification.HasRead,
                    Date = notification.CreatedAt
                });
        }
    }
}