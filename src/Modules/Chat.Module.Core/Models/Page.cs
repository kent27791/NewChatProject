using Chat.Core.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.Models
{
    public class Page : BaseEntity
    {
        public long? ParentId { get; set; }
        public string Name { get; set; }
        public int? Type { get; set; }
        public string Uri { get; set; }
        public string Route { get; set; }
        public bool? IsEnable { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public IList<RolePermission> Roles { get; set; } = new List<RolePermission>();
        public IList<UserPermission> Users { get; set; } = new List<UserPermission>();
    }
}
