using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Chat.Admin.Api.Security
{
    public class MinAgeRequirement : IAuthorizationRequirement
    {
        public MinAgeRequirement(int age)
        {
            Age = age;
        }

        public int Age { get; private set; }
    }

    public class MinAgeHandler : AuthorizationHandler<MinAgeRequirement>
    {
        public MinAgeHandler()
        {

        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinAgeRequirement requirement)



        {
            //bool hasClaim = context.User.HasClaim(c => c.Type == "age");
            //bool hasIdentity = context.User.Identities.Any(i => i.AuthenticationType == "MultiPass");
            ////string claimValue = context.User.FindFirst(c => c.Type == "age").Value;
            //string claimValue = "10";
            //if (int.Parse(claimValue) >= requirement.Age)
            //{
            //    context.Succeed(requirement);
            //}
            //else
            //{
            //    context.Fail();
            //}
            //return Task.CompletedTask;
            if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth &&
                                        c.Issuer == "http://contoso.com"))
            {
                return Task.CompletedTask;
            }

            var dateOfBirth = Convert.ToDateTime(
                context.User.FindFirst(c => c.Type == ClaimTypes.DateOfBirth &&
                                            c.Issuer == "http://contoso.com").Value);

            int calculatedAge = DateTime.Today.Year - dateOfBirth.Year;
            if (dateOfBirth > DateTime.Today.AddYears(-calculatedAge))
            {
                calculatedAge--;
            }

            if (calculatedAge >= requirement.Age)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
