using Chat.Core.Caching;
using Chat.Module.Report.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Controllers
{
    [Route("api/report")]
    public class ReportController : Controller
    {
        private readonly IReportService _reportService;
        private readonly IStaticCacheManager _staticCacheManager;
        public ReportController(IReportService reportService, IStaticCacheManager staticCacheManager)
        {
            this._reportService = reportService;
            this._staticCacheManager = staticCacheManager;
        }

        [Route("test")]
        [HttpGet]
        public IActionResult Test()
        {
            this._staticCacheManager.Set("Test", "Stringaaa", 50000);
            var a = this._staticCacheManager.Get<string>("Test");
            var result = _reportService.FindAll();
            return Ok(result);
        }
    }
}
