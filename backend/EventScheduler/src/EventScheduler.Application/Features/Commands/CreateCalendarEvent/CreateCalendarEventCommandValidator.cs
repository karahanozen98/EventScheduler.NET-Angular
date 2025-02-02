using FluentValidation;

namespace EventScheduler.Application.Features.Commands.CreateCalendarEvent
{
    public class CreateCalendarEventCommandValidator : AbstractValidator<CreateCalendarEventCommand>
    {
        public CreateCalendarEventCommandValidator()
        {
            RuleFor(command => command.Title).NotEmpty().MinimumLength(1);
            RuleFor(commanad => commanad.Description).NotNull();
            RuleFor(commanad => commanad.StartDate).GreaterThan(DateTime.UtcNow);
        }
    }
}