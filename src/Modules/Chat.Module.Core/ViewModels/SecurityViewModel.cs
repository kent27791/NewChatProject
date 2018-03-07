using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Module.Core.ViewModels
{
    public class SecurityViewModel
    {

    }
    public class SignInViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class SignUpViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public bool Condition { get; set; }
    }
}
