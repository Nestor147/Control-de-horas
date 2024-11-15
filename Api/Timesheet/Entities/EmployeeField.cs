using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities
{
    [Keyless]
    public class EmployeeField
    {
        public string AccessControlRoleName { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmail { get; set; }
        public string UnionName { get; set; }
        public string FieldName { get; set; }
        public string EntityCode { get; set; }
        public string EntityName { get; set; }
        public Boolean AcceptNotices { get; set; }
        public Boolean SendNotices { get; set; }
        public Boolean EmployeeActive { get; set; }
    }
}
