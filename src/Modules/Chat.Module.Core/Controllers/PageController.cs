using AutoMapper;
using Chat.Common.DataTable;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/page")]
    [EnableCors("cors-app")]
    public class PageController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly IPageService _pageService;
        private readonly IMapper _mapper;
        public PageController(
            ILogger<PageController> logger,
            IMapper mapper,
            IPageService pageService)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._pageService = pageService;
        }

        [Route("data-table-paging")]
        [HttpPost]
        public IActionResult DataTablePaging([FromBody] DataTableRequest request)
        {
            return Ok(_pageService.DataTablePaging<PageDataTableViewModel>(_pageService.Repository.Query(), request));
        }

        [Route("find/{id}")]
        [HttpGet]
        public IActionResult Find(long id)
        {
            return Ok(_pageService.Find(id));
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create(PageViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var original = _mapper.Map<Page>(viewModel);
            _pageService.Add(original);
            return CreatedAtRoute("find", original.Id);
        }

        [Route("edit/{id}")]
        [HttpPut]
        public IActionResult Edit(long id, PageViewModel viewModel)
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
            return Ok(original);
        }
    }
}
