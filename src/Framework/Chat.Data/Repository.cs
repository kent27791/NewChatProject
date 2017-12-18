using Chat.Core.Data;
using Chat.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chat.Data
{
    public class Repository<TContext, TEntity, TKey> : IRepository<TContext, TEntity, TKey>
        where TEntity : class, IBaseEntityWithTypeId<TKey>
        where TContext : class
    {
        protected readonly IDatabaseContext<TContext> _context;
        protected readonly DbSet<TEntity> _dbSet;
        public Repository(IDatabaseContext<TContext> context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }
        public IQueryable<TEntity> Query()
        {
            return _dbSet;
        }

        public TEntity Find(TKey key)
        {
            return _dbSet.Find(key);
        }

        public TEntity Add(TEntity entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public void Delete(TKey key)
        {
            TEntity entity = Find(key);
            Delete(entity);
        }

        public void Delete(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            _dbSet.Remove(entity);
        }

        public IQueryable<TEntity> FromSql(RawSqlString sql, params object[] paramters)
        {
            return _dbSet.FromSql(sql, paramters);
        }
    }
}
