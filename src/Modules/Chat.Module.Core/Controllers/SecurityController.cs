using AutoMapper;
using Chat.Core.Configuration;
using Chat.Module.Core.Extentions;
using Chat.Module.Core.Models;
using Chat.Module.Core.Services;
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
        private readonly IUserService _userService;
        private readonly ISettings _settings;
        private readonly IMapper _mapper;
        public SecurityController(ILogger<SecurityController> logger,
            SignInManager<User> signInManager, 
            UserManager<User> userManager,
            IUserService userService,
            ISettings settings,
            IMapper mapper)
        {
            this._logger = logger;
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._userService = userService;
            this._settings = settings;
            this._mapper = mapper;
        }

        [Route("token")]
        [HttpPost]
        public IActionResult Token([FromBody] SignInViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var original = _userManager.FindByNameAsync(viewModel.UserName).Result;
            if(original == null || !_userManager.CheckPasswordAsync(original, viewModel.Password).Result)
            {
                return BadRequest();
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, original.UserName),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JwtBearer.SecretKey));
            var token = new JwtSecurityToken(
                issuer: _settings.JwtBearer.Issuer,
                audience: _settings.JwtBearer.Audience,
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
        public IActionResult Create([FromBody] SignUpViewModel viewModel)
        {
            var user = _mapper.Map<User>(viewModel);
            IdentityResult result = _userManager.CreateAsync(user).Result;
            return Ok(user);
        }


    }
}
