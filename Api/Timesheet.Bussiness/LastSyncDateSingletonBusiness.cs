namespace Timesheet.Business
{
    public class LastSyncDateSingleton
    {
        public DateTime? LastSyncDate { get; private set; }

        public LastSyncDateSingleton()
        {
            // Inicializa la fecha con null o un valor predeterminado si es necesario
            LastSyncDate = null;
        }

        public void SetLastSyncDate(DateTime date)
        {
            LastSyncDate = date;
        }
    }
}
