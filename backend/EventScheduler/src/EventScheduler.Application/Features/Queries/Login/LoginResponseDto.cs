namespace EventScheduler.Application.Features.Queries.Login
{
    public class LoginResponseDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }

        public LoginResponseDto(string username, string firstName, string lastName, string token)
        {
            this.Username = username;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Token = token;
        }
    }
}