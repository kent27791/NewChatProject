using Chat.Core.Data;
using Chat.Module.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Chat.Module.Core.Data
{
    public class CoreCustomModelBuilder : ICustomModelBuilder
    {
        public string ContextName => "ChatManagementContext";

        public void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Core_User");

            modelBuilder.Entity<Role>()
                .ToTable("Core_Role");

            modelBuilder.Entity<IdentityUserClaim<long>>(b =>
            {
                b.HasKey(uc => uc.Id);
                b.ToTable("Core_UserClaim");
            });

            modelBuilder.Entity<IdentityRoleClaim<long>>(b =>
            {
                b.HasKey(rc => rc.Id);
                b.ToTable("Core_RoleClaim");
            });

            modelBuilder.Entity<UserRole>(b =>
            {
                b.HasKey(ur => new { ur.UserId, ur.RoleId });
                b.HasOne(ur => ur.Role).WithMany(x => x.Users).HasForeignKey(r => r.RoleId);
                b.HasOne(ur => ur.User).WithMany(x => x.Roles).HasForeignKey(u => u.UserId);
                b.ToTable("Core_UserRole");
            });

            modelBuilder.Entity<IdentityUserLogin<long>>(b =>
            {
                b.ToTable("Core_UserLogin");
            });

            modelBuilder.Entity<IdentityUserToken<long>>(b =>
            {
                b.ToTable("Core_UserToken");
            });

            modelBuilder.Entity<Page>(b =>
            {
                b.HasKey(p => p.Id);
                b.ToTable("Core_Page");
            });

            modelBuilder.Entity<RolePermission>(b =>
            {
                b.HasKey(rp => new { rp.PageId, rp.RoleId });
                b.HasOne(rp => rp.Role).WithMany(x => x.Pages).HasForeignKey(r => r.RoleId);
                b.HasOne(rp => rp.Page).WithMany(x => x.Roles).HasForeignKey(p => p.PageId);
                b.ToTable("Core_RolePermission");
            });

            modelBuilder.Entity<UserPermission>(b =>
            {
                b.HasKey(up => new { up.UserId, up.PageId });
                b.HasOne(up => up.User).WithMany(x => x.Pages).HasForeignKey(u => u.UserId);
                b.HasOne(up => up.Page).WithMany(x => x.Users).HasForeignKey(p => p.PageId);
                b.ToTable("Core_UserPermission");
            });
        }
    }
}
