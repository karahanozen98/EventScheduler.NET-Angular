using System.Security.Claims;
using EventScheduler.Core.Auth;
using EventScheduler.Core.CQRS;
using EventScheduler.Core.Exceptions;
using EventScheduler.Domain.Entities;
using EventScheduler.Infrastructure.Repository;
using EventScheduler.Infrastructure.UnitOfWork;

namespace EventScheduler.Application.Features.Queries.Login
{
    public class LoginQueryHandler : IQueryHandler<LoginQuery, LoginResponseDto>
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IAuthService _authService;

        public LoginQueryHandler(IUnitOfWork unitOfWork, IAuthService authService)
        {
            this._authService = authService;
            this._userRepository = unitOfWork.GetRepository<User>();
        }
        public async Task<LoginResponseDto> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await this._userRepository
                .FirstOrDefaultAsync(e => e.Email == request.Username && e.Password == request.Password, cancellationToken);

            if (user is null)
            {
                throw new NotFoundException("No User found with given credentials");
            }

            var token = this._authService.GenerateJwtToken(new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.FirstName),
                new(ClaimTypes.Surname, user.LastName),
                new(ClaimTypes.Email, user.Email)
            });

            return new LoginResponseDto(
                username: user.Email,
                firstName: user.FirstName,
                lastName: user.LastName,
                token);
        }
    }
}