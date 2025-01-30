using EventScheduler.Domain.Entities;

namespace EventScheduler.Infrastructure.Data
{
    public class DataSeeder
    {
        private readonly ApplicationDbContext _context;

        public DataSeeder(ApplicationDbContext context)
        {
            this._context = context;
        }

        public void SeedData()
        {
            if (!this._context.Users.Any())
            {
                this._context.Users.AddRange(
                    new User("admin@admin.com", "John", "Doe", "admin123")
                );
            }

            this._context.SaveChanges();
        }
    }
}