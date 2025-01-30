using System.Net;

namespace EventScheduler.Core.Api
{
    public class ApiResponse
    {
        public bool IsSuccess { get; set; }

        public string Message { get; set; }

        public ApiResponse()
        {
            this.IsSuccess = true;
            this.Message = HttpStatusCode.OK.ToString();
        }
    }

    public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; }

        public string Message { get; set; }

        public T? Result { get; set; }

        public ApiResponse()
        {
            this.IsSuccess = true;
            this.Message = HttpStatusCode.OK.ToString();
        }

        public ApiResponse(T result)
        {
            this.IsSuccess = true;
            this.Message = HttpStatusCode.OK.ToString();
            this.Result = result;
        }
    }
}