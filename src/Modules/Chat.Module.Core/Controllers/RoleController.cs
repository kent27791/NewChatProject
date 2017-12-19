using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Chat.Module.Core.Controllers
{
    [Route("api/roles")]
    public class RoleController : Controller
    {
        private readonly ILogger<RoleController> _logger;
        private readonly IRoleService _roleService;
        private readonly RoleManager<Role> _roleManager;
        public RoleController(ILogger<RoleController> logger, RoleManager<Role> roleManager, IRoleService roleService)
        {
            this._logger = logger;
            this._roleService = roleService;
            this._roleManager = roleManager;
        }

        [Route("get/{id}")]
        public IActionResult Find(long id)
        {
            return Ok(_roleService.Find(id));
        }
    }
}
