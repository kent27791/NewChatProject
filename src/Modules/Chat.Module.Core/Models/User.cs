using Chat.Core.Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Chat.Module.Core.Models
{
    public class User : IdentityUser<long>, IBaseEntityWithTypeId<long>
    {
        public IList<UserRole> Roles { get; set; } = new List<UserRole>();
        public IList<UserPermission> Pages { get; set; }
    }
}
