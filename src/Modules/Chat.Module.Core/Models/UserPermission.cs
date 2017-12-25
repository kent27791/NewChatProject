using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Models
{
    public class UserPermission
    {
        public long UserId { get; set; }
        public long PageId { get; set; }
        public User User { get; set; }
        public Page Page { get; set; }
    }
}
