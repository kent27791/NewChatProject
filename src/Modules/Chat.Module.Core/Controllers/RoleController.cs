using Chat.Common.DataTable;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
namespace Chat.Module.Core.Controllers
{
    [Route("api/roles")]
    [EnableCors("cors-app")]
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

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_roleService.DataTablePaging<RoleDataTableViewModel>(_roleService.Repository.Query(), request));
        }

        [Route("get/{id}")]
        public IActionResult Find(long id)
        {
            return Ok(_roleService.Find(id));
        }
    }
}
