﻿using System;
using System.Linq;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

using Newtonsoft.Json.Serialization;

using Autofac;
using Autofac.Extensions.DependencyInjection;

using Chat.Core.Configuration;
using Chat.Core.Data;
using Chat.Module.Core.Models;
using Chat.Module.Core.Extentions;
using Chat.Module.Core.Data;
using Chat.Data;
using Chat.Module.Report.Data;

namespace Chat.Admin.Api.Extentions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection LoadInstalledModules(this IServiceCollection services, string contentRootPath)
        {
            var modules = new List<ModuleInfo>();
            var moduleRootFolder = new DirectoryInfo(Path.Combine(contentRootPath, "Modules"));
            var moduleFolders = moduleRootFolder.GetDirectories();

            foreach (var moduleFolder in moduleFolders)
            {
                var binFolder = new DirectoryInfo(Path.Combine(moduleFolder.FullName, "bin"));
                if (!binFolder.Exists)
                {
                    continue;
                }

                foreach (var file in binFolder.GetFileSystemInfos("*.dll", SearchOption.AllDirectories))
                {
                    Assembly assembly;
                    try
                    {
                        assembly = AssemblyLoadContext.Default.LoadFromAssemblyPath(file.FullName);
                    }
                    catch (FileLoadException)
                    {
                        // Get loaded assembly
                        assembly = Assembly.Load(new AssemblyName(Path.GetFileNameWithoutExtension(file.Name)));

                        if (assembly == null)
                        {
                            throw;
                        }
                    }

                    if (assembly.FullName.Contains(moduleFolder.Name))
                    {
                        modules.Add(new ModuleInfo
                        {
                            Name = moduleFolder.Name,
                            Assembly = assembly,
                            Path = moduleFolder.FullName,
                        });
                    }
                }
            }

            GlobalConfiguration.Modules = modules;
            return services;
        }

        public static ISettings GetCustomizedSettings(this IConfiguration configuration)
        {
            ISettings settings = configuration.GetSection("MySettings").Get<MySettings>();
            return settings;
        }

        public static IServiceCollection AddCustomizedSettings(this IServiceCollection services, ISettings settings)
        {
            services.AddSingleton<ISettings>(settings);
            return services;
        }

        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services, IList<ModuleInfo> modules)
        {
            var mvcBuilder = services
                .AddMvc()
                .AddRazorOptions(options => 
                {
                    foreach (var module in modules)
                    {
                        options.AdditionalCompilationReferences.Add(MetadataReference.CreateFromFile(module.Assembly.Location));
                    }
                })
                .AddViewLocalization()
                .AddDataAnnotationsLocalization()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver()
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    };
                });

            foreach (var module in modules)
            {
                // Register controller from modules
                mvcBuilder.AddApplicationPart(module.Assembly);

                // Register dependency in modules
                var moduleInitializerType =
                    module.Assembly.GetTypes().FirstOrDefault(x => typeof(IModuleInitializer).IsAssignableFrom(x));
                if ((moduleInitializerType != null) && (moduleInitializerType != typeof(IModuleInitializer)))
                {
                    var moduleInitializer = (IModuleInitializer)Activator.CreateInstance(moduleInitializerType);
                    moduleInitializer.Init(services);
                }
            }
            return services;
        }
        public static IServiceCollection AddCustomizedIdentity(this IServiceCollection services)
        {
            services
                .AddIdentity<User, Role>()
                .AddRoleStore<SecurityRoleStore>()
                .AddUserStore<SecurityUserStore>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(o => o.LoginPath = new PathString("/login"));

            services.ConfigureApplicationCookie(x => x.LoginPath = new PathString("/login"));

            return services;
        }

        public static IServiceCollection AddCustomizedDataStore(this IServiceCollection services, ISettings settings)
        {
            services.AddDbContext<SecurityManagementContext>(dbOptions =>
                dbOptions.UseSqlServer(settings.ConnectionStrings.SecurityManagement, sqlOptions =>
                    sqlOptions.MigrationsAssembly("Chat.Admin.Api")));

            services.AddDbContext<ChatManagementContext>(dbOptions =>
                dbOptions.UseSqlServer(settings.ConnectionStrings.ChatManagement, sqlOptions =>
                    sqlOptions.MigrationsAssembly("Chat.Admin.Api")));

            return services;
        }

        public static IServiceCollection AddCustomizedAutoMapper(this IServiceCollection services)
        {
            //services.AddAutoMapper();
            return services;
        }

        public static IServiceCollection AddCustomizedSwagger(this IServiceCollection services)
        {
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "Payment api document", Version = "v1" });
            //});
            return services;
        }

        public static IServiceCollection AddCustomizedCors(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsClient", builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            }));
            return services;
        }

        

        public static IServiceProvider Build(this IServiceCollection services, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            var builder = new ContainerBuilder();
            builder.RegisterGeneric(typeof(Repository<, ,>)).As(typeof(IRepository<, ,>));
            //builder.Register<>
            foreach (var module in GlobalConfiguration.Modules)
            {
                builder.RegisterAssemblyTypes(module.Assembly).AsImplementedInterfaces();
            }

            builder.RegisterInstance(configuration);
            builder.RegisterInstance(hostingEnvironment);

            builder.Populate(services);
            var container = builder.Build();
            return container.Resolve<IServiceProvider>();
        }



    }
}
