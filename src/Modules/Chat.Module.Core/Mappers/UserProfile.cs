using AutoMapper;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDataTableViewModel>();
            CreateMap<User, UserDataTableGrantViewModel>()
                .ForMember(dest => dest.PageIds, opts => opts.MapFrom(src => src.Pages.Select(p => p.PageId)));
            CreateMap<User, UserViewModel>().ReverseMap();
        }
    }
}
