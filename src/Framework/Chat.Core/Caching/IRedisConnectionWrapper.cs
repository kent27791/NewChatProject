using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Chat.Core.Caching
{
    public interface IRedisConnectionWrapper
    {
        IDatabase GetDatabase(int? db = null);

        IServer GetServer(EndPoint endPoint);

        EndPoint[] GetEndPoints();

        void FlushDatabase(int? db = null);

        bool PerformActionWithLock(string resource, TimeSpan expirationTime, Action action);
    }
}
