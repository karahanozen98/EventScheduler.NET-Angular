using System.Security.Claims;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Http;

namespace EventScheduler.Application.Features.Commands.DeleteCalendarEvent
{
    public class DeleteCalendarEventCommandHandler : ICommandHandler<DeleteCalendarEventCommand>
    {
        private readonly IGenericRepository<CalendarEvent> _calendarEventRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DeleteCalendarEventCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this._calendarEventRepository = unitOfWork.GetRepository<CalendarEvent>();
            this._unitOfWork = unitOfWork;
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task Handle(DeleteCalendarEventCommand request, CancellationToken cancellationToken)
        {
            var userClaim = this._httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Guid.Parse(userClaim ?? string.Empty);

            var calenderEvent = await this._calendarEventRepository
                .FirstOrDefaultAsync(e => e.Id == request.Id && e.UserId == userId, cancellationToken);

            if (calenderEvent is null)
            {
                throw new NotFoundException($"{nameof(CalendarEvent)} is not found");
            }

            this._calendarEventRepository.Delete(calenderEvent);
            await this._unitOfWork.SaveChangesAsync();
        }
    }
}