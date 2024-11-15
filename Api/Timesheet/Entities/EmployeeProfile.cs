using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities
{
    public class EmployeeProfile
    {
        public int Id { get; set; }
        public string Employeename { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PictureUrl { get; set; }
        public string Identity { get; set; }
    }
}
