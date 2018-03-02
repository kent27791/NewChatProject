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

namespace Chat.Module.Core.Services
{
    public class PageService : BaseService<ChatManagementContext, Page, long>, IPageService
    {
        public PageService(IRepository<ChatManagementContext, Page, long> repository) : base(repository)
        {

        }

        public List<PageTreeViewModel> Tree(int type)
        {
            return _repository.Query().Where(p => p.Type == type || type == (int)PageType.All).ProjectTo<PageTreeViewModel>().ToList();
        }
    }
}
