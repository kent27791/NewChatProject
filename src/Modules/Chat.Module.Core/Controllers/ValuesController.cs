using Chat.Common.DataTable;
using Chat.Core.Configuration;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/values")]
    //[Authorize(Policy = "Permission")]
    [EnableCors("cors-app")]
    public class ValuesController : Controller
    {
        private readonly ISettings _settings;
        private readonly IRoleService _roleService;
        public ValuesController(ISettings settings, IRoleService roleService)
        {
            this._settings = settings;
            this._roleService = roleService;
        }

        [Route("get")]
        public IActionResult Get()
        {
            var a = _roleService.Find(1);

            var b = _roleService.Find(1);

            var redis = _settings.Redis;
            return Json(redis);
        }

        [HttpPost]
        [Route("get-and-process")]
        public IActionResult GetAndProcess([FromBody] DataTableRequest request)
        {
            FilterViewModel filter = request.Filter.ToObject<FilterViewModel>();
            List<UserViewModel> source = new List<UserViewModel>();
            source.Add(new UserViewModel { Id = 1, UserName = "Janna" });
            source.Add(new UserViewModel { Id = 2, UserName = "Javan" });
            source.Add(new UserViewModel { Id = 3, UserName = "Joe" });
            source.Add(new UserViewModel { Id = 4, UserName = "Sivir" });
            source.Add(new UserViewModel { Id = 5, UserName = "Pantheon" });
            DataTableResponse<UserViewModel> response = new DataTableResponse<UserViewModel>(source.Count, 5, 5, source);
            return Ok(response);
        }
    }
}
