using Chat.Common.DataTable;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        public ValuesController()
        {
            
        }

        [Route("get")]
        public IActionResult Get()
        {
            return Ok(/*_roleService.FindAll().Select(s => s.Name).ToArray();*/);
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
