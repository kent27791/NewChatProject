using AutoMapper;
using Chat.Common.DataTable;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
namespace Chat.Module.Core.Controllers
{
    [Route("api/roles")]
    [EnableCors("cors-app")]
    [Authorize(Policy = "Permission")]
    public class RoleController : Controller
    {
        private readonly ILogger<RoleController> _logger;
        private readonly IRoleService _roleService;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        public RoleController(
            ILogger<RoleController> logger, 
            IMapper mapper, 
            RoleManager<Role> roleManager, 
            IRoleService roleService)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._roleService = roleService;
            this._roleManager = roleManager;
        }

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_roleService.DataTablePaging<RoleDataTableViewModel>(_roleService.Repository.Query(), request));
        }

        [Route("find/{id}", Name = "find-role")]
        [HttpGet]
        public IActionResult Find(long id)
        {
            return Ok(_roleService.Find(id));
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody] RoleViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var original = _mapper.Map<Role>(viewModel);
            var result = _roleManager.CreateAsync(original).Result;
            return CreatedAtRoute("find-role", new { id = original.Id }, original);
        }

        [Route("edit/{id}")]
        [HttpPut]
        public IActionResult Edit(long id, [FromBody] RoleViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if(id != viewModel.Id)
            {
                return BadRequest();
            }
            try
            {
                var original = _roleService.Find(id);
                if(original == null)
                {
                    return NotFound();
                }
                original = _mapper.Map(viewModel, original);
                var result = _roleManager.UpdateAsync(original).Result;
                return Ok(original);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult Delete(long id)
        {
            var original = _roleService.Find(id);
            if(original == null)
            {
                return NotFound();
            }
            _roleService.Delete(original);
            return Ok(original);
        }
    }
}
