using Chat.Core.Caching;
using Chat.Core.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Data.Caching
{
    public class RedisCacheManager : IStaticCacheManager
    {
        #region Fields
        private readonly ISettings _settings;
        private readonly IRedisConnectionWrapper _connectionWrapper;
        private readonly ICacheManager _perRequestCacheManager;
        private readonly IDatabase _db;
        #endregion

        public RedisCacheManager(ICacheManager perRequestCacheManager, IRedisConnectionWrapper connectionWrapper, ISettings settings)
        {
            if (string.IsNullOrEmpty(settings.Cachings.RedisConnectionString))
            {
                throw new Exception("Redis connection string is empty");
            }
            this._settings = settings;
            this._perRequestCacheManager = perRequestCacheManager;
            this._connectionWrapper = connectionWrapper;
            this._db = connectionWrapper.GetDatabase();
        }

        #region Utilities
        protected virtual async Task<T> GetAsync<T>(string key)
        {
            //little performance workaround here:
            //we use "PerRequestCacheManager" to cache a loaded object in memory for the current HTTP request.
            //this way we won't connect to Redis server many times per HTTP request (e.g. each time to load a locale or setting)
            if (_perRequestCacheManager.IsSet(key))
                return _perRequestCacheManager.Get<T>(key);

            //get serialized item from cache
            var serializedItem = await _db.StringGetAsync(key);
            if (!serializedItem.HasValue)
                return default(T);

            //deserialize item
            var item = JsonConvert.DeserializeObject<T>(serializedItem);
            if (item == null)
                return default(T);

            //set item in the per-request cache
            _perRequestCacheManager.Set(key, item, 0);

            return item;
        }

        protected virtual async Task SetAsync(string key, object data, int cacheTime)
        {
            if (data == null)
                return;

            //set cache time
            var expiresIn = TimeSpan.FromMinutes(cacheTime);

            //serialize item
            var serializedItem = JsonConvert.SerializeObject(data);

            //and set it to cache
            await _db.StringSetAsync(key, serializedItem, expiresIn);
        }

        protected virtual async Task<bool> IsSetAsync(string key)
        {
            //little performance workaround here:
            //we use "PerRequestCacheManager" to cache a loaded object in memory for the current HTTP request.
            //this way we won't connect to Redis server many times per HTTP request (e.g. each time to load a locale or setting)
            if (_perRequestCacheManager.IsSet(key))
                return true;

            return await _db.KeyExistsAsync(key);
        }

        protected virtual async Task RemoveAsync(string key)
        {
            //we should always persist the data protection key list
            if (key.Equals(_settings.Cachings.DataProtectionKeysName, StringComparison.OrdinalIgnoreCase))
                return;

            //remove item from caches
            await _db.KeyDeleteAsync(key);
            _perRequestCacheManager.Remove(key);
        }

        protected virtual async Task RemoveByPatternAsync(string pattern)
        {
            _perRequestCacheManager.RemoveByPattern(pattern);

            foreach (var endPoint in _connectionWrapper.GetEndPoints())
            {
                var server = _connectionWrapper.GetServer(endPoint);
                var keys = server.Keys(database: _db.Database, pattern: $"*{pattern}*");

                //we should always persist the data protection key list
                keys = keys.Where(key => !key.ToString().Equals(_settings.Cachings.DataProtectionKeysName, StringComparison.OrdinalIgnoreCase));

                await _db.KeyDeleteAsync(keys.ToArray());
            }
        }

        protected virtual async Task ClearAsync()
        {
            _perRequestCacheManager.Clear();

            foreach (var endPoint in _connectionWrapper.GetEndPoints())
            {
                var server = _connectionWrapper.GetServer(endPoint);

                //we can use the code below (commented), but it requires administration permission - ",allowAdmin=true"
                //server.FlushDatabase();

                //that's why we manually delete all elements
                var keys = server.Keys(database: _db.Database);

                //we should always persist the data protection key list
                keys = keys.Where(key => !key.ToString().Equals(_settings.Cachings.DataProtectionKeysName, StringComparison.OrdinalIgnoreCase));

                await _db.KeyDeleteAsync(keys.ToArray());
            }
        }
        #endregion

        #region Method
        public virtual T Get<T>(string key)
        {
            return this.GetAsync<T>(key).Result;
        }

        public virtual async void Set(string key, object data, int cacheTime)
        {
            await this.SetAsync(key, data, cacheTime);
        }

        public virtual bool IsSet(string key)
        {
            return this.IsSetAsync(key).Result;
        }

        public virtual async void Remove(string key)
        {
            await this.RemoveAsync(key);
        }

        public virtual async void RemoveByPattern(string pattern)
        {
            await this.RemoveByPatternAsync(pattern);
        }

        public virtual async void Clear()
        {
            await this.ClearAsync();
        }

        public virtual void Dispose()
        {
            //if (_connectionWrapper != null)
            //    _connectionWrapper.Dispose();
        }
        #endregion
    }
}
