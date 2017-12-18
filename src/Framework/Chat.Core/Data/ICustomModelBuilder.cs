using Microsoft.EntityFrameworkCore;

namespace Chat.Core.Data
{
    public interface ICustomModelBuilder
    {
        void Build(ModelBuilder modelBuilder);
        string ContextName { get; }
    }
}
