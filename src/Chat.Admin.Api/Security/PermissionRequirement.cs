using Chat.Module.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Admin.Api.Security
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public bool IsEnable { get; set; }
    }
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IUserService _userService;
        private readonly ILogger<PermissionHandler> _logger;
        public PermissionHandler(ILogger<PermissionHandler> logger, IUserService userService)
        {
            this._logger = logger;
            this._userService = userService;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if(context.User.Identity.IsAuthenticated && context.Resource is AuthorizationFilterContext filterContext)
            {
                var routeValues = ((ControllerActionDescriptor)filterContext.ActionDescriptor).RouteValues;
                string requestUrl = string.Empty;
                string areaName, controllerName, actionName;
                if (routeValues.TryGetValue("area", out areaName) && areaName != null)
                {
                    requestUrl += $"{areaName}/";
                }
                if (routeValues.TryGetValue("controller", out controllerName))
                {
                    requestUrl += $"{controllerName}/";
                }
                if (routeValues.TryGetValue("action", out actionName))
                {
                    requestUrl += actionName;
                }
                //check permission
                if (_userService.ValidatePermission(context.User.Identity.Name, requestUrl.ToLower()))
                {
                    context.Succeed(requirement);
                }
            }
            return Task.CompletedTask;
        }
    }
}
