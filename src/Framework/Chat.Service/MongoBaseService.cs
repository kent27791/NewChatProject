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

        public MongoBaseService(IMongoRepository<TContext, TEntity, TKey> repository)
        {
            this._repository = repository;
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
            return _repository.Update(filterDefinition, updateDefinition).IsAcknowledged;
        }

        public bool Delete(TKey key)
        {
            return _repository.Delete(key).IsAcknowledged;
        }

        public bool Delete(TEntity entity)
        {
            return _repository.Delete(entity).IsAcknowledged;
        }

        public bool Save(TEntity entity)
        {
            return _repository.Save(entity).IsAcknowledged;
        }
    }
}
