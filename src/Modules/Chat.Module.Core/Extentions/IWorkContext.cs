using Chat.Module.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Extentions
{
    public interface IWorkContext
    {
        Task<User> GetCurrentUser();
    }
}
