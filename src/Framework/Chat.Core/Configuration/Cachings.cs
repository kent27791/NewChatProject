using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class Cachings
    {
        public bool RedisCachingEnabled { get; set; }
        public string RedisConnectionString { get; set; }
        public string DataProtectionKeysName { get; set; }
    }
}
