using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class MySettings : ISettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
    }
}
