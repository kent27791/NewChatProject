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
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserController(
            ILogger<UserController> logger,
            IMapper mapper,
            UserManager<User> userManager,
            IUserService userService)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._userManager = userManager;
            this._userService = userService;
        }

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_userService.DataTablePaging<UserDataTableViewModel>(_userService.Repository.Query(), request));
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
    }
}
