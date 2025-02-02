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
                    new User
                    {
                        Id = new Guid("cbab5b6c-f11c-4b04-a8b6-573551675e60"),
                        Email = "admin@admin.com",
                        FirstName = "John",
                        LastName = "Doe",
                        Password = "admin123"
                    }
                );
            }

            this._context.SaveChanges();
        }
    }
}