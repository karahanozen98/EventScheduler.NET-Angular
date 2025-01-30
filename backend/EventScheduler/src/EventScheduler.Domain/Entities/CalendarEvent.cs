using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EventScheduler.Domain.Common;

namespace EventScheduler.Domain.Entities
{
    public class CalendarEvent : BaseEntity
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
    }
}