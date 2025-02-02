using System.ComponentModel.DataAnnotations;
using EventScheduler.Domain.Common;

namespace EventScheduler.Domain.Entities
{
    public class User : BaseEntity
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        [Required]
        public required string Password { get; set; }

        public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];

        public ICollection<Notification> Notifications { get; set; } = [];
    }
}