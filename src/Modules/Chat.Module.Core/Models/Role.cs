using Chat.Core.Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Chat.Module.Core.Models
{
    public class Role : IdentityRole<long>, IBaseEntityWithTypeId<long>
    {
        public IList<UserRole> Users { get; set; } = new List<UserRole>();
        public IList<RolePermission> Pages { get; set; } = new List<RolePermission>();
    }
}
