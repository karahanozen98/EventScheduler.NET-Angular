using EventScheduler.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventScheduler.Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .Property(e => e.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                .HasIndex(e => e.Email)
                .IsUnique();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
    }
}