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
        public ReportController(IReportService reportService)
        {
            this._reportService = reportService;
        }

        [Route("test")]
        [HttpGet]
        public IActionResult Test()
        {
            var result = _reportService.FindAll();
            return Ok(result);
        }
    }
}
