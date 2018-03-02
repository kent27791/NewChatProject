using System.Linq;

using Chat.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Chat.Core.Data
{
    public interface IRepository<TContext, TEntity, TKey>
        where TEntity : IBaseEntityWithTypeId<TKey>
        where TContext : class
    {
        IQueryable<TEntity> Query();

        TEntity Find(TKey key);

        TEntity Add(TEntity entity);

        TEntity Update(TEntity entity);

        void Delete(TKey key);

        void Delete(TEntity entity);

        IQueryable<TEntity> FromSql(RawSqlString sql, params object[] parameters);

        void Reload(TEntity entity);

        IDbConnection GetDbConnection();

        void Commit();
    }
}
