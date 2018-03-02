using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Chat.Core.Data
{
    public interface IUnitOfWork<TContext> where TContext : DbContext
    {
        void Commit();
        IDbConnection GetDbConnection();
    }
}
