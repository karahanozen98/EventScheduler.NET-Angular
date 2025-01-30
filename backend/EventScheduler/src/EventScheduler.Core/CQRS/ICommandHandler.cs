using MediatR;

namespace EventScheduler.Core.CQRS
{
    public interface ICommandHandler<TRequest> : IRequestHandler<TRequest> where TRequest : ICommand { }

    public interface ICommandHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : ICommand<TResponse> { }
}