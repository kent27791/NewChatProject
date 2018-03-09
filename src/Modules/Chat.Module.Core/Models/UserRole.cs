using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Models
{
    public class UserRole : IdentityUserRole<long>
    {
        public override long UserId { get; set; }
        public override long RoleId { get; set; }

        public Role Role { get; set; }
        public User User { get; set; }

        public override bool Equals(object obj)
        {
            UserRole other = obj as UserRole;
            return other.UserId == this.UserId && other.RoleId == this.RoleId;
        }
        public override int GetHashCode()
        {
            return this.UserId.GetHashCode() ^ this.RoleId.GetHashCode();
        }
    }
}
