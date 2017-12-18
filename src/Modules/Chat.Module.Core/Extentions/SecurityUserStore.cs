using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Extentions
{
    public class SecurityUserStore : UserStore<User, Role, SecurityManagementContext, long, IdentityUserClaim<long>, UserRole,
        IdentityUserLogin<long>, IdentityUserToken<long>, IdentityRoleClaim<long>>
    {
        public SecurityUserStore(SecurityManagementContext context, IdentityErrorDescriber describer) : base(context, describer)
        {

        }
    }
}
