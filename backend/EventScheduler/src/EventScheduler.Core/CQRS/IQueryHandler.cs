using MediatR;

namespace EventScheduler.Core.CQRS
{
    public interface IQueryHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IQuery { }

    public interface IQueryHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IQuery<TResponse> { }
}