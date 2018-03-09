using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.ViewModels
{
    public class RoleViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
    public class RoleDataTableViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public  class RoleDataTableGrantViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool Checked { get; set; }
        public List<long> UserIds { get; set; }
    }
}
