using System;
using System.Linq;
using System.Text;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Serialization;

using Autofac;
using Autofac.Extensions.DependencyInjection;

using AutoMapper;

using MongoDB.Driver;

using Chat.Core.Configuration;
using Chat.Core.Data;
using Chat.Core.Caching;

using Chat.Data.Repository;
using Chat.Data.Caching;

using Chat.Module.Core.Models;
using Chat.Module.Core.Extentions;
using Chat.Module.Core.Data;
using Chat.Module.Report.Data;

using Chat.Admin.Api.Security;
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

        public static MySettings GetCustomizedSettings(this IConfiguration configuration)
        {
            MySettings settings = configuration.GetSection("MySettings").Get<MySettings>();
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
                    //options.SerializerSettings.Culture = new CultureInfo("vi-VN");
                    //options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                    //options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;
                    //options.SerializerSettings.DateParseHandling = DateParseHandling.None;
                    options.SerializerSettings.DateFormatString = "dd/MM/yyyy HH:mm:ss";
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver()
                    {
                        //NamingStrategy = new SnakeCaseNamingStrategy()
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
                .AddIdentity<User, Role>(options => 
                {
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddRoleStore<SecurityRoleStore>()
                .AddUserStore<SecurityUserStore>()
                .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection AddCustomizedDataStore(this IServiceCollection services, ISettings settings)
        {
            //for sql server
            services.AddDbContextPool<ChatManagementContext>(dbOptions =>
                dbOptions.UseSqlServer(settings.Databases.SqlConnectionStrings.ChatManagement, sqlOptions =>
                    sqlOptions.MigrationsAssembly("Chat.Admin.Api")));
            //for mongodb
            services.AddSingleton<IMongoDatabaseContext<ReportManagementContext>>(context =>
            {
                return new ReportManagementContext(new MongoUrl(settings.Databases.MongoConnectionStrings.ChatManagement));
            });

            return services;
        }

        public static IServiceCollection AddCustomizedAuthentication(this IServiceCollection services, ISettings settings)
        {
            services.AddAuthentication(config =>
                    {
                        config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                        config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = settings.JwtBearer.Issuer,
                            ValidAudience = settings.JwtBearer.Audience,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.JwtBearer.SecretKey))
                        };
                    });

            return services;
        }

        public static IServiceCollection AddCustomizedAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Permission", policy =>
                {
                    policy.Requirements.Add(new PermissionRequirement());
                });
            });
            return services;
        }

        public static IServiceCollection AddCustomizedAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper();
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
            services.AddCors(options => options.AddPolicy("cors-app", builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            }));
            return services;
        }

        public static IServiceProvider Build(this IServiceCollection services, IConfiguration configuration, IHostingEnvironment hostingEnvironment, ISettings settings)
        {
            var builder = new ContainerBuilder();
            builder.RegisterGeneric(typeof(Repository<,,>)).As(typeof(IRepository<,,>));
            builder.RegisterGeneric(typeof(MongoDbRepository<,,>)).As(typeof(IMongoRepository<,,>));
            foreach (var module in GlobalConfiguration.Modules)
            {
                builder.RegisterAssemblyTypes(module.Assembly).AsImplementedInterfaces();
            }

            builder.RegisterInstance(configuration);
            builder.RegisterInstance(hostingEnvironment);

            builder.RegisterType<PerRequestCacheManager>().As<ICacheManager>().InstancePerLifetimeScope();
            if (settings.Cachings.RedisCachingEnabled)
            {
                builder.RegisterType<RedisConnectionWrapper>().As<IRedisConnectionWrapper>().SingleInstance();
                builder.RegisterType<RedisCacheManager>().As<IStaticCacheManager>().InstancePerLifetimeScope();
            }
            else
            {
                builder.RegisterType<MemoryCacheManager>().As<IStaticCacheManager>().SingleInstance();
            }
           
            builder.Populate(services);
            var container = builder.Build();
            return container.Resolve<IServiceProvider>();
        }
    }
}
