using Chat.Module.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
    }

    public class UserDataTableViewModel
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class UserDataTableGrantViewModel
    {
        public UserDataTableGrantViewModel()
        {
            this.PageIds = new List<long>();
        }
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool Checked { get; set; }
        public List<long> PageIds { get; set; }
    }
}
