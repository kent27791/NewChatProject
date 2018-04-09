using Chat.Core.Caching;
using Chat.Core.Data;
using Chat.Core.Service;
using Chat.Module.Report.Data;
using Chat.Module.Report.Models;
using Chat.Service;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Services
{
    public class ReportService : MongoBaseService<ReportManagementContext, Student, ObjectId>, IReportService
    {
        public ReportService(IMongoRepository<ReportManagementContext, Student, ObjectId> repository, IStaticCacheManager cacheManager) 
            : base(repository, cacheManager)
        {

        }
    }
}
