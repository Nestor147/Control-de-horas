using Timesheet.Entities;

namespace Timesheet.Interfaces

{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : EntityBase;
        Task<int> Complete();
    }
}
