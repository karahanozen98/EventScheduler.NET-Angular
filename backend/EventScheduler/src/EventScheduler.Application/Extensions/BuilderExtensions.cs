using EventScheduler.Core.Validation;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;

namespace EventScheduler.Application.Extensions
{
    public static class BuilderExtension
    {
        public static IServiceCollection AddCQRS(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(BuilderExtension).Assembly);
                cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });

            return services;
        }

        public static IServiceCollection AddValidatorsFromAssembly(this IServiceCollection services)
        {
            return services.AddValidatorsFromAssembly(typeof(BuilderExtension).Assembly);
        }
    }
}