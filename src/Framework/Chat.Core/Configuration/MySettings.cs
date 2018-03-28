using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class MySettings : ISettings
    {
        public Databases Databases { get; set; }
        public Cachings Cachings { get; set; }
        public JwtBearer JwtBearer { get; set; }
    }
}
