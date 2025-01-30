using MediatR;

namespace EventScheduler.Core.CQRS
{
    public interface ICommand : IRequest { }

    public interface ICommand<TResponse> : IRequest<TResponse> { }
}