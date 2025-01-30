namespace EventScheduler.Core.Exceptions
{
    public class UnAuthorizedException : Exception
    {
        public UnAuthorizedException(string message = "User is not authorized") : base(message)
        {

        }
    }
}