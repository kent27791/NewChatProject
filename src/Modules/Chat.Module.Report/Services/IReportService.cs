using Chat.Core.Service;
using Chat.Module.Report.Data;
using Chat.Module.Report.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Services
{
    public interface IReportService : IMongoService<ReportManagementContext, Student, ObjectId>
    {
    }
}
