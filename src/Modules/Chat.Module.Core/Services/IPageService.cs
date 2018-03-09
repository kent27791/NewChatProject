using Chat.Core.Service;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Services
{
    public interface IPageService : IService<ChatManagementContext, Page, long>
    {
        List<PageTreeViewModel> Tree(int type);

        List<MenuViewModel> Menus(long userId, List<long> roleIds);
    }
}
