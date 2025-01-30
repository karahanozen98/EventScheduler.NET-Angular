using MediatR;

namespace EventScheduler.Core.CQRS
{
    public interface IQuery : IRequest { }

    public interface IQuery<TResponse> : IRequest<TResponse> { }
}