namespace Timesheet.Interfaces
{
    public interface IContextTransaction
    {
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task CloseConnectioAsync();
        void BeginTransaction();
        void Commit();
        void Rollback();
        void CloseConnectio();
    }
}
