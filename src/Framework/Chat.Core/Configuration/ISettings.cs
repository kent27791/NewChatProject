using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public interface ISettings
    {
        ConnectionStrings ConnectionStrings { get; set; }
    }
}
