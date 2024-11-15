using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities
{
    public class Vacation: EntityBase
    {
        public DateTime InitialDate { get; set; }
        public DateTime EndDate { get; set; }
        public int VacationType { get; set; }
        public string Justification { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime RequestDate { get; set; }

        public  int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }
}
