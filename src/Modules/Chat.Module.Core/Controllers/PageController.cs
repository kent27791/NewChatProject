using AutoMapper;
using Chat.Common.DataTable;
using Chat.Module.Core.Enums;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/page")]
    [EnableCors("cors-app")]
    //[Authorize(Policy = "Permission")]
    public class PageController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly IPageService _pageService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public PageController(
            ILogger<PageController> logger,
            IMapper mapper,
            IPageService pageService,
            IUserService userService)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._pageService = pageService;
            this._userService = userService;
        }

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_pageService.DataTablePaging<PageDataTableViewModel>(_pageService.Repository.Query(), request));
        }

        [Route("find/{id}", Name = "find-page")]
        [HttpGet]
        public IActionResult Find(long id)
        {
            return Ok(_pageService.Find(id));
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody] PageViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var original = _mapper.Map<Page>(viewModel);
            _pageService.Add(original);
            _pageService.Repository.Commit();
            return CreatedAtRoute("find-page", new { id = original.Id }, original);
        }

        [Route("edit/{id}")]
        [HttpPut]
        public IActionResult Edit(long id, [FromBody] PageViewModel viewModel)
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
                var original = _pageService.Find(id);
                if (original == null)
                {
                    return NotFound();
                }
                original = _mapper.Map(viewModel, original);
                _pageService.Update(original);
                _pageService.Repository.Commit();
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
            var original = _pageService.Find(id);
            if (original == null)
            {
                return NotFound();
            }
            _pageService.Delete(original);
            _pageService.Repository.Commit();
            return Ok(original);
        }

        [Route("tree/{type}")]
        [HttpGet]
        public IActionResult Tree(int type)
        {
            return Ok(_pageService.Repository.Query().Where(p => p.Type == type || type == (int)PageType.All).ToList());
        }

        [Route("user-grant-data-table-paging/{id}")]
        [HttpPost]
        public IActionResult UserGrantDataTablePaging([FromRoute] long id, [FromBody] DataTableRequest request)
        {
            var result = _userService.DataTablePaging<UserDataTableGrantViewModel>(_userService.Repository.Query().Include(u => u.Pages), request);
            result.Data.ToList().ForEach(u => u.Checked = u.PageIds.Any(p => p == id));
            return Ok(result);
        }

        [Route("grant-user-permission/{userId}")]
        [HttpGet]
        public IActionResult GrantUserPermission(long pageId, [FromRoute] long userId)
        {
            var originalPage = _pageService.Repository.Query().Include(p => p.Users).SingleOrDefault(p => p.Id == pageId);
            if (originalPage == null)
            {
                return NotFound();
            }
            originalPage.Users.Add(new UserPermission
            {
                PageId = originalPage.Id,
                UserId = userId
            });
            _pageService.Update(originalPage);
            _pageService.Repository.Commit();
            return Ok();
        }

        [Route("deny-user-permission/{userId}")]
        [HttpGet]
        public IActionResult DenyUserPermission(long pageId, [FromRoute] long userId)
        {
            var originalPage = _pageService.Repository.Query().Include(p => p.Users).SingleOrDefault(p => p.Id == pageId);
            if (originalPage == null)
            {
                return NotFound();
            }
            originalPage.Users.Remove(new UserPermission
            {
                PageId = originalPage.Id,
                UserId = userId
            });
            _pageService.Update(originalPage);
            _pageService.Repository.Commit();
            return Ok();
        }
    }
}
