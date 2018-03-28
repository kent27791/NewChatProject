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
            if (mongoUrl.DatabaseName == null)
            {
                throw new Exception("Mongo database null");
            }
            _mongoClient = new MongoClient(mongoUrl);
            _mongoDatabase = _mongoClient.GetDatabase(mongoUrl.DatabaseName);
        }

        public IMongoClient MongoClient => _mongoClient;

        public IMongoDatabase MongoDatabase => _mongoDatabase;

        public void DropDatabase(string databaseName)
        {
            this._mongoClient.DropDatabase(databaseName);
        }

        public void DropCollection(string collectionName)
        {
            this._mongoDatabase.DropCollection(collectionName);
        }
    }
}
