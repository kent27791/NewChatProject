using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Chat.Module.Report.ViewModels;
using Chat.Module.Report.Services;

namespace Chat.Module.Report.Controllers
{
    [Route("api/chat")]
    public class ChatController : Controller
    {
        private readonly IReportChartService _reportChartService;
        public ChatController(IReportChartService reportChartService)
        {
            this._reportChartService = reportChartService;
        }

        [Route("get")]
        public IActionResult Get()
        {
            return Json(new ChatViewModel { Id = 1, Result = "Result test" });
        }
    }
}
