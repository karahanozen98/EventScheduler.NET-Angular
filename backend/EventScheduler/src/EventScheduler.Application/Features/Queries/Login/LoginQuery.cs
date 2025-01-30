using EventScheduler.Core.CQRS;

namespace EventScheduler.Application.Features.Queries.Login
{
    public class LoginQuery : IQuery<LoginResponseDto>
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public LoginQuery(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }
    }
}