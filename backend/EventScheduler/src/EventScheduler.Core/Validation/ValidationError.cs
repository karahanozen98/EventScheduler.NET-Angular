namespace EventScheduler.Core.Validation
{
    public class ValidationError
    {
        public string PropertyName { get; set; }

        public string Message { get; set; }

        public ValidationError(string propertyName, string message)
        {
            this.PropertyName = propertyName;
            this.Message = message;
        }
    }
}