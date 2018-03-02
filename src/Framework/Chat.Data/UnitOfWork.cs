using Chat.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Chat.Data
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext>
        where TContext : DbContext
    {
        protected readonly TContext _context;
        public void Commit()
        {
            _context.SaveChanges();
        }

        public IDbConnection GetDbConnection()
        {
            return _context.Database.GetDbConnection();
        }
    }
}
