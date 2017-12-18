using Chat.Core.Data;
using Chat.Core.Domain;
using Chat.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chat.Service
{
    public class BaseService<TContext, TEntity, TKey> : IService<TContext, TEntity, TKey>
        where TEntity : IBaseEntityWithTypeId<TKey>
        where TContext : class
    {
        protected readonly IRepository<TContext, TEntity, TKey> _repository;

        public IRepository<TContext, TEntity, TKey> Repository => _repository;

        public BaseService(IRepository<TContext, TEntity, TKey> repository)
        {
            this._repository = repository;
        }

        public TEntity Find(TKey key)
        {
            return _repository.Find(key);
        }

        public IEnumerable<TEntity> FindAll()
        {
            return _repository.Query().Take(1000).ToList();
        }
        public TEntity Add(TEntity entity)
        {
            return _repository.Add(entity);
        }

        public TEntity Update(TEntity entity)
        {
            return _repository.Update(entity);
        }

        public void Delete(TKey key)
        {
            _repository.Delete(key);
        }

        public void Delete(TEntity entity)
        {
            _repository.Delete(entity);
        }
    }
}
