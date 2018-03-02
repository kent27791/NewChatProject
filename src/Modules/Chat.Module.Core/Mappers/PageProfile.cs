using AutoMapper;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Mappers
{
    public class PageProfile : Profile
    {
        public PageProfile()
        {
            CreateMap<Page, PageDataTableViewModel>();
            CreateMap<Page, PageViewModel>();
            CreateMap<PageViewModel, Page>()
                .ForMember(dest => dest.CreatedOn, opts => opts.MapFrom(src => DateTime.Now));

        }
    }
}
