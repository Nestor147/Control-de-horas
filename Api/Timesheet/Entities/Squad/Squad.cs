using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities.Attendance
{
    public class Squad : EntityBase
    {
        public string Name { get; set; }
        public string Leader { get; set; }
        public List<string> Members { get; set; }
        public string DefaultArea { get; set; }
        public string DefaultIteration { get; set; }
        public string Manager { get; set; }
        public string KanbanPrefix { get; set; }
        public string KanbanLaneName { get; set; }
        public string KanbanColumnName { get; set; }
        public string ProjectName { get; set; }
        public bool EnablePerformanceAppraisal { get; set; }
        public int? TaskDurationLimit { get; set; } 
    }

}
