using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Models
{
    public class RolePermission 
    {
        public long PageId { get; set; }
        public long RoleId { get; set; }
        public Role Role { get; set; }
        public Page Page { get; set; }
    }
}
