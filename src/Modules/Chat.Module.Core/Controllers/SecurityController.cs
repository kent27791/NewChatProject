using Chat.Module.Core.Models;
using Chat.Module.Core.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Module.Core.Controllers
{
    [Route("api/security")]
    public class SecurityController : Controller
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        public SecurityController(ILogger<SecurityController> logger, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            this._logger = logger;
            this._signInManager = signInManager;
            this._userManager = userManager;
        }

        [Route("token")]
        [HttpPost]
        public IActionResult Token()
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "admin")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SecurityKeySecurityKeySecurityKey"));
            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience: "yourdomain.com",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                expires_in = DateTime.Now.AddMinutes(30),
                token_type = "bearer"
            });
        }

        [Route("create-user")]
        [HttpPost]
        public IActionResult Create()
        {
            var user = new User
            {
                Email = "admin@localhost.com",
                UserName = "admin"
            };
            IdentityResult result = _userManager.CreateAsync(user).Result;
            return Ok();
        }


    }
}
