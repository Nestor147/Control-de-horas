using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheet.Entities.Email
{
    public class SmtpConfig: EntityBase
    {
        public string HostName { get; set; }
        public int Port { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool IsSslEnabled { get; set; }
        public List<string> ReplyList { get; set; }
    }
}
