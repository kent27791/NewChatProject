using AutoMapper.QueryableExtensions;
using Chat.Common.DataTable;
using Chat.Common.Extentions;
using Chat.Core.Caching;
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
        protected readonly IStaticCacheManager _cacheManager;

        public IRepository<TContext, TEntity, TKey> Repository => _repository;

        public BaseService(IRepository<TContext, TEntity, TKey> repository, IStaticCacheManager cacheManager)
        {
            this._repository = repository;
            this._cacheManager = cacheManager;
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

        public DataTableResponse<UEntity> DataTablePaging<UEntity>(IQueryable<TEntity> data, DataTableRequest request)
        {
            //filter by all columns by full text search.
            if (!string.IsNullOrEmpty(request.Search.Value))
            {
                //data = LinqHelper.Filter(data, request.SearchColumns, FtsInterceptor.Fts(dataTableRequest.Search.Value));
            }
            //count total after filter
            var count = data.Count();
            DataTableResponse<UEntity> result = new DataTableResponse<UEntity>(request.Draw, count, count);
            //order by column
            foreach (var orderProperty in request.Order)
            {
                var column = request.Columns.ElementAt(orderProperty.Column);
                if (column.Orderable && !string.IsNullOrEmpty(column.Name))
                {
                    data = LinqHelper.DynamicOrderBy(data, column.Name, orderProperty.Dir);
                }
            }
            //convert by type
            var dataOfType = data.Skip(request.Start).Take(request.Length).ProjectTo<UEntity>();
            result.Data = dataOfType.ToList();
            return result;
        }
    }
}
