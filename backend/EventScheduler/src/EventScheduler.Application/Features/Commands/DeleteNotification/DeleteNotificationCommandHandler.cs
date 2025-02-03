using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;

namespace EventScheduler.Application.Features.Commands.DeleteNotification
{
    public class DeleteNotificationCommandHandler : ICommandHandler<DeleteNotificationCommand>
    {
        private readonly IGenericRepository<Notification> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteNotificationCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this._repository = unitOfWork.GetRepository<Notification>();
            this._unitOfWork = unitOfWork;
            this._httpContextAccessor = httpContextAccessor;
        }
        public async Task Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.Parse(userClaim ?? string.Empty);

            var notification = await this._repository
                .FirstOrDefaultAsync(e => e.Id == request.Id && e.UserId == userId, cancellationToken);

            if (notification is null)
            {
                throw new NotFoundException($"{nameof(Notification)} is not found");
            }

            this._repository.Delete(notification);
            await this._unitOfWork.SaveChangesAsync();
        }
    }
}