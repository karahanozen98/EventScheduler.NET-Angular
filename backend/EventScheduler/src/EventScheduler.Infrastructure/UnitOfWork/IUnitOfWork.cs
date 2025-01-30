using EventScheduler.Domain.Common;
using EventScheduler.Infrastructure.Repository;

namespace EventScheduler.Infrastructure.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IGenericRepository<T> GetRepository<T>() where T : BaseEntity;
        public Task SaveChangesAsync();
    }
}