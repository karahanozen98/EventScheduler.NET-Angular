using System.Linq.Expressions;
using EventScheduler.Domain.Common;
using EventScheduler.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventScheduler.Infrastructure.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            this._dbSet = context.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _dbSet.Where(e => e.IsDeleted == false).ToListAsync(cancellationToken);
        }

        public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _dbSet.Where(e => e.IsDeleted == false).FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
        }

        public async Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
        {
            return await _dbSet.Where(e => e.IsDeleted == false).FirstOrDefaultAsync(predicate, cancellationToken);
        }

        public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Where(e => e.IsDeleted == false).Where(predicate);
        }

        public async Task AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
        }

        public void AddRange(TEntity[] entities)
        {
            _dbSet.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public void UpdateRange(TEntity[] entities)
        {
            _dbSet.UpdateRange(entities);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var entity = await GetByIdAsync(id, cancellationToken);

            if (entity is null)
            {
                throw new Exception($"{typeof(TEntity).Name} is not found");
            }

            entity.IsDeleted = true;
        }

        public void Delete(TEntity entity)
        {
            entity.IsDeleted = true;
        }
    }
}