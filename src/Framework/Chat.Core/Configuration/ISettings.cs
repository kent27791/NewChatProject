using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public interface ISettings
    {
        ConnectionStrings ConnectionStrings { get; set; }

        MongoConnectionStrings MongoDbConnectionStrings { get; set; }

        Redis Redis { get; set; }

        JwtBearer JwtBearer { get; set; }
    }
}
