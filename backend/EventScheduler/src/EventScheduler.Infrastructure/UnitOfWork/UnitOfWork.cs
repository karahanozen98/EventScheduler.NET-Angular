using EventScheduler.Domain.Common;
using EventScheduler.Infrastructure.Data;
using EventScheduler.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EventScheduler.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IServiceProvider _serviceProvider;

        public UnitOfWork(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            this._context = context;
            this._serviceProvider = serviceProvider;
        }

        public IGenericRepository<T> GetRepository<T>() where T : BaseEntity
        {
            return this._serviceProvider.GetRequiredService<IGenericRepository<T>>();
        }

        public async Task SaveChangesAsync()
        {
            var date = DateTime.Now;

            foreach (var entry in this._context.ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.SetCreatedAt(date);
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.SetUpdatedAt(date);
                }
            }

            await this._context.SaveChangesAsync();
        }
    }
}