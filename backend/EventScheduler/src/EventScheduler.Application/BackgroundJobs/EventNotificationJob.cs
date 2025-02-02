using EventScheduler.Application.Services.Notification;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EventScheduler.Application.BackgroundJobs
{
    public class EventNotificationJob : IHostedService, IDisposable
    {
        private Timer? _timer;
        private readonly ILogger<EventNotificationJob> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public EventNotificationJob(
            ILogger<EventNotificationJob> logger,
            IServiceScopeFactory serviceScopeFactory)
        {
            this._logger = logger;
            this._scopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            this._logger.LogInformation($"{nameof(EventNotificationJob)} has started");
            this._timer = new Timer(CheckForUpcomingEvents, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            this._logger.LogInformation($"{nameof(EventNotificationJob)} has stopped");
            this._timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            this._timer?.Dispose();
        }

        private async void CheckForUpcomingEvents(object? state)
        {
            this._logger.LogInformation($"{nameof(EventNotificationJob)} is running at {DateTime.Now}");

            try
            {
                using var scope = _scopeFactory.CreateScope();
                var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                var eventRepository = unitOfWork.GetRepository<CalendarEvent>();
                var notificationRepository = unitOfWork.GetRepository<Notification>();
                var notifications = new List<Notification>();

                var now = DateTime.UtcNow;
                var tomorrow = now.AddDays(1);

                var upcomingEvents = await eventRepository
                    .Where(e => !e.HasNotified && e.StartDate >= now && e.StartDate <= tomorrow)
                    .ToListAsync();

                if (upcomingEvents.Any())
                {
                    this._logger.LogInformation($"Found {upcomingEvents.Count} upcoming events within 24 hours.");
                    var notificationService = scope.ServiceProvider.GetRequiredService<EventNotificationService>();

                    foreach (var ev in upcomingEvents)
                    {
                        // set HasNotified property true to prevent duplicate notifications from the same event 
                        ev.HasNotified = true;

                        // create a new notification record
                        var notification = new Notification
                        {
                            Message = $"Reminder: {ev.Title} is happening in {GenerateLeftTimeMessage(ev.StartDate)}.",
                            UserId = ev.UserId
                        };
                        notifications.Add(notification);
                        _ = notificationService.SendNotificationAsync(ev.UserId, notification.Message);
                    }

                    eventRepository.UpdateRange([.. upcomingEvents]);
                    notificationRepository.AddRange([.. notifications]);
                    await unitOfWork.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                this._logger.LogError($"An error occured during the execution of {nameof(EventNotificationJob)}: {e}");
            }
        }

        public static string GenerateLeftTimeMessage(DateTime targetTime)
        {
            var timeLeft = targetTime - DateTime.UtcNow;
            string? timeMessage;

            if (timeLeft.TotalHours < 1)
            {
                timeMessage = $"{timeLeft.Minutes} minutes";
            }
            else
            {
                timeMessage = $"{(int)timeLeft.TotalHours} hours";
            }

            return timeMessage;
        }
    }
}