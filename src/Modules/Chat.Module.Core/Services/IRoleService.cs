using Chat.Core.Service;
using Chat.Module.Core.Data;
using Chat.Module.Core.Models;

namespace Chat.Module.Core.Services
{
    public interface IRoleService : IService<ChatManagementContext, Role, long>
    {

    }
}
