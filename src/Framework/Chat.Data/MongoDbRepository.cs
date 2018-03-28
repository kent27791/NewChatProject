using Chat.Core.Data;
using Chat.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;
using Chat.Core.Configuration;
using System.Linq;
using MongoDB.Bson;

namespace Chat.Data
{
    public class MongoDbRepository<TContext, TEntity, TKey> : IMongoRepository<TContext, TEntity, TKey>
        where TEntity : class, IBaseEntityWithTypeId<TKey>
    {
        protected readonly IMongoCollection<TEntity> _collection;
        protected readonly IMongoDatabaseContext<TContext> _context;
        public MongoDbRepository(IMongoDatabaseContext<TContext> context)
        {
            this._collection = context.MongoDatabase.GetCollection<TEntity>(typeof(TEntity).Name.ToLower());
        }

        public IQueryable<TEntity> Query()
        {
            return this._collection.AsQueryable<TEntity>();
        }

        public TEntity Find(TKey key)
        {
            return this._collection.Find(t => t.Id.Equals(key)).SingleOrDefault();
        }

        public TEntity Add(TEntity entity)
        {
            this._collection.InsertOne(entity);
            return entity;
        }

        public UpdateResult Update(FilterDefinition<TEntity> filterDefinition, UpdateDefinition<TEntity> updateDefinition)
        {
            UpdateResult result = this._collection.UpdateOne(filterDefinition, updateDefinition);
            return result;
        }

        public DeleteResult Delete(TKey key)
        {
            return this._collection.DeleteOne(t => t.Id.Equals(key));
        }

        public DeleteResult Delete(TEntity entity)
        {
            return this._collection.DeleteOne(t => t.Id.Equals(entity.Id));
        }

        public ReplaceOneResult Save(TEntity entity)
        {
            return this._collection.ReplaceOne(t => t.Id.Equals(entity.Id), entity, new UpdateOptions { IsUpsert = true });
        }
    }
}
