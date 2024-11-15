
using Timesheet.Entities;

namespace Timesheet.Interfaces
{
    public interface IGenericRepository<T> : IContextTransaction where T : EntityBase
    {
        Task<T> GetById(int id);
        Task<IReadOnlyList<T>> GetAll();
        Task<T> GetByIdWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetAllWithSpec(ISpecification<T> spec);

        Task<int> CountAsync(ISpecification<T> spec);
        Task<int> Save(T entity);
        int SaveVoid(T entity);
        Task<int> Delete(T entity);
        Task<int> Update(T entity);

        void AddEntity(T entity);
        void UpdateEntity(T entity);
        void DeleteEntity(T entity);
        void Add(T entity);
        Task<int> Complet();
        void Detached(T entity);
        void Unchanged(T entity);
    }
}


