using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EventScheduler.Domain.Common;

namespace EventScheduler.Domain.Entities
{
    public class Notification : BaseEntity
    {
        [Required]
        public string Message { get; set; } = "";

        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public bool HasRead { get; set; } = false;
    }
}