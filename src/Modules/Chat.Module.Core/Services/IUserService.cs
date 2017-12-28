using Chat.Core.Service;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Services
{
    public interface IUserService : IService<SecurityManagementContext, User, long>
    {
        IEnumerable<UserPermission> PermissionByUser(long userId);

        bool ValidatePermission(long userId, string uri);

        bool ValidatePermission(string userName, string uri);
    }
}
