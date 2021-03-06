﻿using Chat.Core;
using Chat.Core.Configuration;
using Chat.Core.Data;
using Chat.Core.Domain;
using Chat.Module.Core.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Data;

namespace Chat.Module.Core.Data
{
    public class ChatManagementContext :
        IdentityDbContext<User, Role, long, IdentityUserClaim<long>, UserRole, IdentityUserLogin<long>, IdentityRoleClaim<long>,
        IdentityUserToken<long>>, IDatabaseContext<ChatManagementContext>
    {
        public ChatManagementContext(DbContextOptions<ChatManagementContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<Type> typeToRegisters = new List<Type>();
            foreach (var module in GlobalConfiguration.Modules)
            {
                typeToRegisters.AddRange(module.Assembly.DefinedTypes.Select(t => t.AsType()));
            }

            modelBuilder.RegisterEntities(typeToRegisters);

            modelBuilder.RegisterConvention();

            base.OnModelCreating(modelBuilder);

            modelBuilder.RegisterCustomMappings(this, typeToRegisters);
        }

        public void Commit()
        {
            this.SaveChanges();
        }
    }
}
