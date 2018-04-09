using Chat.Core.Caching;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Chat.Data.Caching
{
    public class PerRequestCacheManager : ICacheManager
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PerRequestCacheManager(IHttpContextAccessor httpContextAccessor)
        {
            this._httpContextAccessor = httpContextAccessor;
        }

        #region Utilities
        protected IDictionary<object, object> GetItems()
        {
            return _httpContextAccessor.HttpContext?.Items;
        }
        #endregion

        #region Methods
        public T Get<T>(string key)
        {
            var items = GetItems();
            if (items == null)
                return default(T);

            return (T)items[key];
        }

        public void Set(string key, object data, int cacheTime)
        {
            var items = GetItems();
            if (items == null)
                return;

            if (data != null)
                items[key] = data;
        }

        public bool IsSet(string key)
        {
            var items = GetItems();

            return items?[key] != null;
        }

        public void Remove(string key)
        {
            var items = GetItems();

            items?.Remove(key);
        }

        public void RemoveByPattern(string pattern)
        {
            var items = GetItems();
            if (items == null)
                return;

            this.RemoveByPattern(pattern, items.Keys.Select(p => p.ToString()));
        }

        public void RemoveByPattern(string pattern, IEnumerable<string> keys)
        {
            //get cache keys that matches pattern
            var regex = new Regex(pattern, RegexOptions.Singleline | RegexOptions.Compiled | RegexOptions.IgnoreCase);
            var matchesKeys = keys.Where(key => regex.IsMatch(key)).ToList();

            //remove matching values
            matchesKeys.ForEach(this.Remove);
        }


        public void Clear()
        {
            var items = GetItems();

            items?.Clear();
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
        #endregion
    }
}
