using Chat.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chat.Module.Report.Models;

namespace Chat.Module.Report.Data
{
    public class ReportCustomModelBuilder : ICustomModelBuilder
    {
        public string ContextName => "ChatManagementContext";

        public void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReportChat>(b =>
            {
                b.HasKey(ur => new { ur.Id, ur.ReportedDate });
                b.ToTable("Report_Chat");
            });
              
                
        }
    }
}
