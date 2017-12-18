using Chat.Core.Data;
using Chat.Module.Report.Data;
using Chat.Module.Report.Models;
using Chat.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Services
{
    public class ReportChatService : BaseService<ChatManagementContext, ReportChat, long>, IReportChartService
    {
        public ReportChatService(IRepository<ChatManagementContext, ReportChat, long> repository) : base(repository)
        {

        }
    }
}
