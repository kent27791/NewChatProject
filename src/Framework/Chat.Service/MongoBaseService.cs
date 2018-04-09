using Chat.Core.Caching;
using Chat.Core.Data;
using Chat.Core.Domain;
using Chat.Core.Service;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chat.Service
{
    public class MongoBaseService<TContext, TEntity, TKey> : IMongoService<TContext, TEntity, TKey>
         where TEntity : IBaseEntityWithTypeId<TKey>
    {
        protected readonly IMongoRepository<TContext, TEntity, TKey> _repository;
        protected readonly IStaticCacheManager _cacheManager;

        public MongoBaseService(IMongoRepository<TContext, TEntity, TKey> repository, IStaticCacheManager cacheManager)
        {
            this._repository = repository;
            this._cacheManager = cacheManager;
        }

        public IMongoRepository<TContext, TEntity, TKey> Repository => _repository;

        public TEntity Find(TKey key)
        {
            return _repository.Find(key);
        }

        public IEnumerable<TEntity> FindAll()
        {
            return _repository.Query().ToList();
        }
        public TEntity Add(TEntity entity)
        {
            return _repository.Add(entity);
        }

        public bool Update(FilterDefinition<TEntity> filterDefinition, UpdateDefinition<TEntity> updateDefinition)
        {
            return _repository.Update(filterDefinition, updateDefinition).ModifiedCount > 0;
        }

        public bool Delete(TKey key)
        {
            return _repository.Delete(key).DeletedCount > 0;
        }

        public bool Delete(TEntity entity)
        {
            return _repository.Delete(entity).DeletedCount > 0;
        }

        public bool Save(TEntity entity)
        {
            return _repository.Save(entity).ModifiedCount > 0;
        }
    }
}
