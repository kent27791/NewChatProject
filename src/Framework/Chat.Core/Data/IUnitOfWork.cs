using Microsoft.EntityFrameworkCore;

namespace Chat.Core.Data
{
    public interface IUnitOfWork<TContext> where TContext : DbContext
    {
        void Commit();
    }
}
