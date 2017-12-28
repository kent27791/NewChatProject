using Chat.Module.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/values")]
    [Authorize(Policy = "Permission")]
    public class ValuesController : Controller
    {
        //private readonly IRoleService _roleService;
        public ValuesController(/*IRoleService roleService*/)
        {
            //this._roleService = roleService;
        }

        [Route("get")]
        public IActionResult Get()
        {
            return Ok(/*_roleService.FindAll().Select(s => s.Name).ToArray();*/);
        }

        [Route("get-and-process")]
        public IActionResult GetAndProceess()
        {
            return Ok();
        }
    }
}
