using Chat.Core.Domain;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chat.Core.Data
{
    public interface IMongoRepository<TContext, TEntity, TKey>
       where TEntity : IBaseEntityWithTypeId<TKey>
    {
        IQueryable<TEntity> Query();

        TEntity Find(TKey key);

        TEntity Add(TEntity entity);

        UpdateResult Update(FilterDefinition<TEntity> filterDefinition, UpdateDefinition<TEntity> updateDefinition);

        DeleteResult Delete(TKey key);

        DeleteResult Delete(TEntity entity);

        ReplaceOneResult Save(TEntity entity);
    }
}
