using Chat.Core.Data;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Data
{
    public class ReportManagementContext : IMongoDatabaseContext<ReportManagementContext>
    {
        protected readonly IMongoClient _mongoClient;
        protected readonly IMongoDatabase _mongoDatabase;
        public ReportManagementContext(MongoUrl mongoUrl)
        {
            _mongoClient = new MongoClient(mongoUrl);
            _mongoDatabase = _mongoClient.GetDatabase(mongoUrl.DatabaseName);
        }

        public IMongoClient MongoClient => _mongoClient;

        public IMongoDatabase MongoDatabase => _mongoDatabase;
    }
}
