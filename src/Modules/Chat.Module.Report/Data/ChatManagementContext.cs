using Chat.Core;
using Chat.Core.Configuration;
using Chat.Core.Data;
using Chat.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Data;

namespace Chat.Module.Report.Data
{
    public class ChatManagementContext : DbContext, IDatabaseContext<ChatManagementContext>
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

            //RegisterEntities(modelBuilder, typeToRegisters);

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
