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
        public long ParentId { get; set; }
        public string Route { get; set; }
        public string Uri { get; set; }
        public int Type { get; set; }
        public bool IsEnable { get; set; }
    }

    public class PageDataTableViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class PageTreeViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
