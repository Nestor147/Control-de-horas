using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;
using System.Text.Json;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Interfaces;

namespace Timesheet.EFContext.Data
{
    public class GenericRepository<T> : IContextTransaction, IGenericRepository<T> where T : EntityBase
    {
        private readonly TimesheetDBContext _context;
        public GenericRepository(TimesheetDBContext context)
        {
            _context = context;
        }
        public async Task<IReadOnlyList<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetByIdWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        public async Task<IReadOnlyList<T>> GetAllWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public async Task<int> Save(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Add(entity);
            //_context._logger.LogInformation(Serialize(entity));
            return await _context.SaveChangesAsync();
        }
        public int SaveVoid(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Add(entity);
            return _context.SaveChanges();
        }

        public async Task<int> Delete(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Remove(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Update(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }

        public void AddEntity(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void UpdateEntity(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void DeleteEntity(T entity)
        {
            //_context._logger.LogInformation(Serialize(entity));
            _context.Set<T>().Remove(entity);
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }
        public async Task<int> Complet()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {

            await _context.Database.BeginTransactionAsync();

        }
        public async Task CommitAsync()
        {
            await _context.Database.CommitTransactionAsync();
        }
        public async Task RollbackAsync()
        {
            await _context.Database.RollbackTransactionAsync();
        }
        public async Task CloseConnectioAsync()
        {
            await _context.Database.CloseConnectionAsync();
        }
        public void BeginTransaction()
        {
            _context.Database.BeginTransaction();
        }
        public void Commit()
        {
            _context.Database.CommitTransaction();
        }
        public void Rollback()
        {
            _context.Database.RollbackTransaction();
        }
        public void CloseConnectio()
        {
            _context.Database.CloseConnection();
        }

        private static string Serialize(object data)
        {
            JsonSerializerOptions jso = new JsonSerializerOptions();
            jso.Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
            return JsonSerializer.Serialize(data, jso);
        }
        public void Detached(T entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
        }

        public void Unchanged(T entity)
        {
            _context.Entry(entity).State = EntityState.Unchanged;
        }
    }
}
