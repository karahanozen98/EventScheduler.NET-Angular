using System.Linq.Expressions;

namespace EventScheduler.Infrastructure.Repository
{
    public interface IGenericRepository<TEntity>
    {
        public Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);
        Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        public Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken);
        public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
        public Task AddAsync(TEntity entity, CancellationToken cancellationToken);
        public void Update(TEntity entity);
        public Task DeleteAsync(Guid id, CancellationToken cancellationToken);
        void Delete(TEntity entity);
    }
}