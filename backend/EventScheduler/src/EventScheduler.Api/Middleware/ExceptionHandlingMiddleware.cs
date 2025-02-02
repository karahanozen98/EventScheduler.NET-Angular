using EventScheduler.Core.Api;
using EventScheduler.Core.Exceptions;
using EventScheduler.Core.Validation;

namespace EventScheduler.Api.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            this._next = next;
            this._logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await this._next(context);
            }
            catch (ValidationException exception)
            {
                var response = new ApiResponse<IEnumerable<ValidationError>>(exception.ValidationErrors);
                response.IsSuccess = false;
                response.Message = exception.Message;
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (Exception exception)
            {
                // Log HTTP exceptions
                this._logger.LogError($"An error occured during Http request, Details: {exception}");
                // return exception response
                var response = new ApiResponse<string>(exception.ToString());
                response.Message = exception.Message;
                response.IsSuccess = false;
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}
