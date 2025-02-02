using FluentValidation;

namespace EventScheduler.Application.Features.Commands.UpdateCalendarEvent
{
    public class UpdateCalendarEventCommandValidator : AbstractValidator<UpdateCalendarEventCommand>
    {
        public UpdateCalendarEventCommandValidator()
        {
            RuleFor(commanad => commanad.Id).NotEmpty();
            RuleFor(command => command.Title).NotEmpty().MinimumLength(1);
            RuleFor(commanad => commanad.Description).NotNull();
            RuleFor(commanad => commanad.StartDate).GreaterThan(DateTime.UtcNow);
        }
    }
}