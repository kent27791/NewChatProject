using AutoMapper;
using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
namespace Chat.Module.Core.Mappers
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDataTableViewModel>();
            CreateMap<Role, RoleViewModel>().ReverseMap();
        }
    }
}
