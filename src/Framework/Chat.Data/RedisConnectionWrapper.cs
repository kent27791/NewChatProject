using Chat.Core.Caching;
using Chat.Core.Configuration;
using RedLockNet.SERedis;
using RedLockNet.SERedis.Configuration;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace Chat.Data
{
    public class RedisConnectionWrapper : IRedisConnectionWrapper
    {
        #region Fields
        private readonly ISettings _settings;
        private readonly Lazy<string> _connectionString;
        private volatile ConnectionMultiplexer _connection;
        private volatile RedLockFactory _redisLockFactory;
        private readonly object _lock = new object();
        #endregion

        public RedisConnectionWrapper(ISettings settings)
        {
            this._settings = settings;
            this._connectionString = new Lazy<string>(GetConnectionString);
            this._redisLockFactory = CreateRedisLockFactory();
        }

        #region Utilities
        protected string GetConnectionString()
        {
            return _settings.Cachings.RedisConnectionString;
        }

        protected ConnectionMultiplexer GetConnection()
        {
            if (_connection != null && _connection.IsConnected) return _connection;

            lock (_lock)
            {
                if (_connection != null && _connection.IsConnected) return _connection;

                //Connection disconnected. Disposing connection...
                _connection?.Dispose();

                //Creating new instance of Redis Connection
                _connection = ConnectionMultiplexer.Connect(_connectionString.Value);
            }

            return _connection;
        }

        protected RedLockFactory CreateRedisLockFactory()
        {
            //get RedLock endpoints
            var configurationOptions = ConfigurationOptions.Parse(_connectionString.Value);
            var redLockEndPoints = GetEndPoints().Select(endPoint => new RedLockEndPoint
            {
                EndPoint = endPoint,
                Password = configurationOptions.Password,
                Ssl = configurationOptions.Ssl,
                RedisDatabase = configurationOptions.DefaultDatabase,
                ConfigCheckSeconds = configurationOptions.ConfigCheckSeconds,
                ConnectionTimeout = configurationOptions.ConnectTimeout,
                SyncTimeout = configurationOptions.SyncTimeout
            }).ToList();

            //create RedLock factory to use RedLock distributed lock algorithm
            return RedLockFactory.Create(redLockEndPoints);
        }
        #endregion

        #region Methods
        public IDatabase GetDatabase(int? db = null)
        {
            return GetConnection().GetDatabase(db ?? -1);
        }

        public IServer GetServer(EndPoint endPoint)
        {
            return GetConnection().GetServer(endPoint);
        }

        public EndPoint[] GetEndPoints()
        {
            return GetConnection().GetEndPoints();
        }

        public void FlushDatabase(int? db = null)
        {
            var endPoints = GetEndPoints();

            foreach (var endPoint in endPoints)
            {
                GetServer(endPoint).FlushDatabase(db ?? -1);
            }
        }

        public bool PerformActionWithLock(string resource, TimeSpan expirationTime, Action action)
        {
            //use RedLock library
            using (var redisLock = _redisLockFactory.CreateLock(resource, expirationTime))
            {
                //ensure that lock is acquired
                if (!redisLock.IsAcquired)
                    return false;

                //perform action
                action();

                return true;
            }
        }
        #endregion
    }
}
