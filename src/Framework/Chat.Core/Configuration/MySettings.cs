using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class MySettings : ISettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
        public MongoConnectionStrings MongoDbConnectionStrings { get; set; }
        public Redis Redis { get; set; }
        public JwtBearer JwtBearer { get; set; }
    }
}
