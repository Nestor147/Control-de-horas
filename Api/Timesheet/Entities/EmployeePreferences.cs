using System.ComponentModel.DataAnnotations.Schema;

namespace Timesheet.Entities
{
    public class EmployeePreferences : EntityBase
    {
        public int EmployeeId { get; set; }
        public int TopList { get; set; }
        public string MenuFavorite { get; set; }

        [NotMapped]
        public int keyValue { get; set; }

        [NotMapped]
        public string keyName { get; set; }

    }
}
