using EventScheduler.Domain.Common;

namespace EventScheduler.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; protected set; }
        public string FirstName { get; protected set; }
        public string LastName { get; protected set; }
        public string Password { get; protected set; }
        public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];

        public User(string email, string firstName, string lastName, string password)
        {
            this.Email = email;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Password = password;
        }

        public void SetFullname(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
}