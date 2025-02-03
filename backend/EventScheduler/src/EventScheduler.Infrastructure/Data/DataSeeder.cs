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
                    },
                    new User
                    {
                        Id = new Guid("8aa543f8-f0ec-4b2e-a0c5-2c5bc1478c7c"),
                        Email = "john@example.com",
                        FirstName = "John",
                        LastName = "Doe",
                        Password = "john123"
                    }
                );
            }

            this._context.SaveChanges();
        }
    }
}