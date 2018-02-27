using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Chat.Module.Core.Extentions
{
    public class SecurityRoleStore : RoleStore<Role, ChatManagementContext, long, UserRole, IdentityRoleClaim<long>>
    {
        public SecurityRoleStore(ChatManagementContext context, IdentityErrorDescriber describer) 
            : base(context, describer)
        {

        }
    }
}
