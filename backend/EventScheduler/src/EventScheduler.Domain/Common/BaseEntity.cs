using System.ComponentModel.DataAnnotations;

namespace EventScheduler.Domain.Common
{
    public abstract class BaseEntity
    {
        [Key]
        public virtual Guid Id { get; set; }

        public virtual DateTime CreatedAt { get; set; }

        public virtual DateTime UpdatedAt { get; set; }

        public virtual bool IsDeleted { get; set; } = false;

        public void SetCreatedAt(DateTime date)
        {
            this.CreatedAt = date;
        }

        public void SetUpdatedAt(DateTime date)
        {
            this.UpdatedAt = date;
        }
    }
}