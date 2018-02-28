using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.ViewModels
{
    public class PageViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class PageDataTableViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
