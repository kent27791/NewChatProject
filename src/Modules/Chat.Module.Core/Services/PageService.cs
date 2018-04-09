using Chat.Core.Data;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using Chat.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Chat.Module.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Chat.Core.Caching;

namespace Chat.Module.Core.Services
{
    public class PageService : BaseService<ChatManagementContext, Page, long>, IPageService
    {
        public PageService(IRepository<ChatManagementContext, Page, long> repository, IStaticCacheManager cacheManager) 
            : base(repository, cacheManager)
        {

        }

        public List<PageTreeViewModel> Tree(int type)
        {
            return _repository.Query().Where(p => p.Type == type || type == (int)PageType.All).ProjectTo<PageTreeViewModel>().ToList();
        }

        public List<MenuViewModel> Menus(long userId, List<long> roleIds)
        {
            return _repository.Query()
                .Include(p => p.Users)
                .Where
                (
                    p => p.Users.Any(u => u.UserId == userId) ||
                    p.Roles.Any(r => 
                        p.Users.SingleOrDefault(u => u.UserId == userId).User.Roles.Select(ur => ur.RoleId).Contains(r.RoleId))
                )
                .ProjectTo<MenuViewModel>().ToList();
        }
    }
}
