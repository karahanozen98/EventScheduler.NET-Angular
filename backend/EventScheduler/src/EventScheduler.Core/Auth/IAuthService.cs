using System.Security.Claims;

namespace EventScheduler.Core.Auth
{
    public interface IAuthService
    {
        public string GenerateJwtToken(IEnumerable<Claim> claims);
    }
}