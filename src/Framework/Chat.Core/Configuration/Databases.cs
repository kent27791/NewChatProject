using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Configuration
{
    public class Databases
    {
        public SqlConnectionStrings SqlConnectionStrings { get; set; }
        public MongoConnectionStrings MongoConnectionStrings { get; set; }
    }
}
