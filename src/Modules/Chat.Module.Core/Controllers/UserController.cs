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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/user")]
    [EnableCors("cors-app")]
    [Authorize(Policy = "Permission")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserController(
            ILogger<UserController> logger,
            IMapper mapper,
            UserManager<User> userManager,
            IUserService userService,
            IRoleService roleService)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._userManager = userManager;
            this._userService = userService;
            this._roleService = roleService;
        }

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_userService.DataTablePaging<UserDataTableViewModel>(_userService.Repository.Query(), request));
        }

        [Route("role-grant-data-table-paging/{id}")]
        [HttpPost]
        public IActionResult RoleGrantDataTablePaging([FromRoute] long id, [FromBody] DataTableRequest request)
        {
            var result = _roleService.DataTablePaging<RoleDataTableGrantViewModel>(_roleService.Repository.Query().Include(u => u.Users), request);
            result.Data.ToList().ForEach(u => u.Checked = u.UserIds.Any(p => p == id));
            return Ok(result);
        }

        [Route("find/{id}")]
        [HttpGet]
        public IActionResult Find(long id)
        {
            return Ok(_userService.Find(id));
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create(UserViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var original = _mapper.Map<User>(viewModel);
            _userService.Add(original);
            return CreatedAtRoute("find", original.Id);
        }

        [Route("edit/{id}")]
        [HttpPut]
        public IActionResult Edit(long id, UserViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (id != viewModel.Id)
            {
                return BadRequest();
            }
            try
            {
                var original = _userService.Find(id);
                if (original == null)
                {
                    return NotFound();
                }
                original = _mapper.Map(viewModel, original);
                _userService.Update(original);
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
            var original = _userService.Find(id);
            if (original == null)
            {
                return NotFound();
            }
            _userService.Delete(original);
            return Ok(original);
        }

        [Route("grant-role/{roleId}")]
        [HttpGet]
        public IActionResult GrantRole(long userId, [FromRoute] long roleId)
        {
            var originalUser = _userService.Repository.Query().Include(u => u.Roles).SingleOrDefault(u => u.Id == userId);
            if (originalUser == null)
            {
                return NotFound();
            }
            originalUser.Roles.Add(new UserRole
            {
                RoleId = roleId,
                UserId = userId
            });
            _userService.Update(originalUser);
            _userService.Repository.Commit();
            return Ok();
        }

        [Route("deny-role/{roleId}")]
        [HttpGet]
        public IActionResult DenyRole(long userId, [FromRoute] long roleId)
        {
            var originalUser = _userService.Repository.Query().Include(u => u.Roles).SingleOrDefault(u => u.Id == userId);
            if (originalUser == null)
            {
                return NotFound();
            }
            originalUser.Roles.Remove(new UserRole
            {
                RoleId = roleId,
                UserId = userId
            });
            _userService.Update(originalUser);
            _userService.Repository.Commit();
            return Ok();
        }
    }
}
