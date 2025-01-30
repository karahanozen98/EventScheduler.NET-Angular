using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EventScheduler.Core.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        public AuthService(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            // Create a symmetric security key using the secret key from the configuration.
            var authSigningKey = new SymmetricSecurityKey
                            (Encoding.UTF8.GetBytes(this._configuration["JwtSettings:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = this._configuration["JwtSettings:Issuer"],
                Audience = this._configuration["JwtSettings:Audience"],
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(int.Parse(this._configuration["JwtSettings:TTL"])),
                SigningCredentials = new SigningCredentials
                              (authSigningKey, SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}