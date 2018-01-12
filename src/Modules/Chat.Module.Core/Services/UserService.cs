using System.Linq;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;

using Chat.Core.Data;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Chat.Service;
using Dapper;
namespace Chat.Module.Core.Services
{
    public class UserService : BaseService<SecurityManagementContext, User, long>, IUserService
    {
        public UserService(IRepository<SecurityManagementContext, User, long> repository) : base(repository)
        {
            
        }

        public IEnumerable<UserPermission> PermissionByUser(long userId)
        {
            var result = this._repository
                             .Query()
                             .Include(u => u.Pages)
                             .Select(u => u.Pages.Where(up => up.UserId == userId))
                             .SingleOrDefault();
            return result;
        }

        public bool ValidatePermission(long userId, string uri)
        {
            var result = this._repository
                             .Query()
                             .Any(u => u.Pages.Any(up => up.UserId == userId && up.Page.Uri == uri));
            return result;
        }

        public bool ValidatePermission(string userName, string uri)
        {
            var result = this._repository
                              .Query()
                              .Any(u => u.UserName == userName && u.Pages.Any(up => up.Page.Uri == uri));
            return result;
        }
    }
}
