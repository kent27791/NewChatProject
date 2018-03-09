using AutoMapper;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using System.Linq;

namespace Chat.Module.Core.Mappers
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDataTableViewModel>();
            CreateMap<Role, RoleDataTableGrantViewModel>()
                .ForMember(dest => dest.UserIds, opts => opts.MapFrom(src => src.Users.Select(u => u.UserId)));
            CreateMap<Role, RoleViewModel>().ReverseMap();
        }
    }
}
