using Chat.Module.Report.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Report.Controllers
{
    [Route("api/mongo")]
    public class MongoController : Controller
    {
        private readonly IReportService _reportService;
        public MongoController(IReportService reportService)
        {
            this._reportService = reportService;
        }

        [Route("test")]
        public IActionResult Test()
        {
            var result = _reportService.FindAll();
            return Ok(result);
        }
    }
}
