using Chat.Core.Data;
using Chat.Core.Domain;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Service
{
    public interface IMongoService<TContext, TEntity, TKey>
         where TEntity : IBaseEntityWithTypeId<TKey>
    {
        IMongoRepository<TContext, TEntity, TKey> Repository { get; }

        TEntity Find(TKey key);

        IEnumerable<TEntity> FindAll();

        TEntity Add(TEntity entity);

        bool Update(FilterDefinition<TEntity> filterDefinition, UpdateDefinition<TEntity> updateDefinition);

        bool Delete(TKey key);

        bool Delete(TEntity entity);

        bool Save(TEntity entity);
    }
}
