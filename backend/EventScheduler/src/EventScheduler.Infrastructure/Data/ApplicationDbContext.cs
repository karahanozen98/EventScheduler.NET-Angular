using EventScheduler.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventScheduler.Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasKey(e => e.Id);
            modelBuilder.Entity<User>().HasIndex(e => e.Email).IsUnique();

            modelBuilder.Entity<CalendarEvent>().HasIndex(e => e.Id);
            modelBuilder.Entity<CalendarEvent>().HasOne(e => e.User).WithMany(e => e.CalendarEvents);

            modelBuilder.Entity<Notification>().HasIndex(e => e.Id);
            modelBuilder.Entity<Notification>().HasOne(e => e.User).WithMany(user => user.Notifications);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Notification> Notifications { get; set; }
    }
}