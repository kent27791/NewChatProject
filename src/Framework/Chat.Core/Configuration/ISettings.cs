using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public interface ISettings
    {
        Databases Databases { get; set; }

        Cachings Cachings { get; set; }

        JwtBearer JwtBearer { get; set; }
    }
}
