using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class JwtBearer
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
