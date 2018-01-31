using System;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;

using Chat.Admin.Api.Extentions;
using Chat.Core.Configuration;
using Chat.Module.Core.Extentions;
using Chat.Module.Core.Models;
using Chat.Admin.Api.Security;
namespace Chat.Admin.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly ISettings _settings;
        private readonly IHostingEnvironment _hostingEnvironment;

        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
            _settings = configuration.GetCustomizedSettings();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            GlobalConfiguration.WebRootPath = _hostingEnvironment.WebRootPath;
            GlobalConfiguration.ContentRootPath = _hostingEnvironment.ContentRootPath;

            services.LoadInstalledModules(_hostingEnvironment.ContentRootPath);

            services.AddCustomizedDataStore(_settings);
            services.AddCustomizedIdentity();
            services.AddCustomizedAuthentication(_settings);
            services.AddCustomizedAuthorization();
            services.AddCustomizedMvc(GlobalConfiguration.Modules);
            services.AddCustomizedCors();
            services.AddCustomizedAutoMapper();

            services.AddScoped<SignInManager<User>, SecuritySignInManager<User>>();
            services.AddScoped<IWorkContext, WorkContext>();
            services.AddScoped<ISettings, MySettings>(factory => _configuration.GetCustomizedSettings());
            services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
           
            return services.Build(_configuration, _hostingEnvironment);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            //else
            //{
            //    app.UseExceptionHandler("/Home/Error");
            //}
            //app.UseStatusCodePagesWithReExecute("/Home/ErrorWithCode/{0}"); //authentication return 404.
            app.UseCustomizedStaticFiles(env);
            app.UseCustomizedIdentity();
            app.UseCustomizedMvc();
            app.UseCustomizedCors();

        }
    }
}
