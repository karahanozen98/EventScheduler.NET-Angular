using EventScheduler.Application.BackgroundJobs;

namespace EventScheduler.Tests;

public class NotificationJobTests
{
    [Fact]
    public void ShouldSayOneHourLater()
    {
        var oneHourLater = DateTime.UtcNow.AddHours(1.5);
        var message = EventNotificationJob.GenerateLeftTimeMessage(oneHourLater);
        Assert.Equal("1 hour", message);
    }

    [Fact]
    public void ShouldSayOne10HourLater()
    {
        var oneHourLater = DateTime.UtcNow.AddHours(10.1);
        var message = EventNotificationJob.GenerateLeftTimeMessage(oneHourLater);
        Assert.Equal("10 hours", message);
    }

    [Fact]
    public void ShouldSayOne10MinutesLater()
    {
        var oneHourLater = DateTime.UtcNow.AddMinutes(10.1);
        var message = EventNotificationJob.GenerateLeftTimeMessage(oneHourLater);
        Assert.Equal("10 minutes", message);
    }

    [Fact]
    public void ShouldSayOne1MinutesLater()
    {
        var oneMinuteLater = DateTime.UtcNow.AddSeconds(65);
        var message = EventNotificationJob.GenerateLeftTimeMessage(oneMinuteLater);
        Assert.Equal("1 minute", message);
    }

    [Fact]
    public void ShouldSayOne1MinutesLaterForNegativeDates()
    {
        var oneMinuteLater = DateTime.UtcNow.AddHours(-1);
        var message = EventNotificationJob.GenerateLeftTimeMessage(oneMinuteLater);
        Assert.Equal("1 minute", message);
    }
}
