using Chat.Core.Data;
using Chat.Core.Domain;
using Chat.Core.Service;
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
    }
}
