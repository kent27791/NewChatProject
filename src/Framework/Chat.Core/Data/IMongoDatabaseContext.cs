using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Data
{
    public interface IMongoDatabaseContext<TContext>
    {
        IMongoClient MongoClient { get; }
        IMongoDatabase MongoDatabase { get; }
    }
}
