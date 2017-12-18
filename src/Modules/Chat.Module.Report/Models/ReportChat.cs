using Chat.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Models
{
    public class ReportChat : BaseEntity
    {
        public DateTime ReportedDate { get; set; }
        public decimal Result { get; set; }
    }
}
