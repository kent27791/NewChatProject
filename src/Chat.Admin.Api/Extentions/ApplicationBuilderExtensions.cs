﻿using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

using NLog.Extensions.Logging;
using NLog.Web;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

namespace Chat.Admin.Api.Extentions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCustomizedIdentity(this IApplicationBuilder app)
        {
            app.UseAuthentication();
            return app;
        }

        public static IApplicationBuilder UseCustomizedLocalization(this IApplicationBuilder app)
        {
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("vi-VN"),
                //// Formatting numbers, dates, etc.
                //SupportedCultures = new[] { new CultureInfo("vi-VN") },
                //// UI strings that we have localized.
                //SupportedUICultures = new[] { new CultureInfo("vi-VN") },
            });
            return app;
        }

        public static IApplicationBuilder UseCustomizedMvc(this IApplicationBuilder app)
        {
            app.UseMvc();
            return app;
        }

        public static IApplicationBuilder UseCustomizedStaticFiles(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = (context) =>
                    {
                        var headers = context.Context.Response.GetTypedHeaders();
                        headers.CacheControl = new CacheControlHeaderValue
                        {
                            NoCache = true,
                            NoStore = true,
                            MaxAge = TimeSpan.FromDays(-1)
                        };
                    }
                });
            }
            else
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = (context) =>
                    {
                        var headers = context.Context.Response.GetTypedHeaders();
                        headers.CacheControl = new CacheControlHeaderValue
                        {
                            Public = true,
                            MaxAge = TimeSpan.FromDays(60)
                        };
                    }
                });
            }

            return app;
        }

        public static IApplicationBuilder UseCustomizedLogger(this IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //add Nlog
            loggerFactory.AddNLog();
            //add NLog.Web
            app.AddNLogWeb();
            //config
            env.ConfigureNLog("nlog.config");
            return app;
        }

        public static IApplicationBuilder UseCustomizedSwagger(this IApplicationBuilder app)
        {
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Payment api document version 1");
            //});
            return app;
        }

        public static IApplicationBuilder UseCustomizedCors(this IApplicationBuilder app)
        {
            app.UseCors("cors-app");
            return app;
        }
    }
}
