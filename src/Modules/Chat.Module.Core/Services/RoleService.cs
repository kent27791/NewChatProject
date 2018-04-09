using Chat.Core.Caching;
using Chat.Core.Data;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Chat.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Services
{
    public class RoleService : BaseService<ChatManagementContext, Role, long>, IRoleService
    {
        public RoleService(IRepository<ChatManagementContext, Role, long> repository, IStaticCacheManager cacheManager) 
            : base(repository, cacheManager)
        {
            
        }
    }
}
