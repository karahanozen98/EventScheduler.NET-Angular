# EventScheduler Project

This repository provides a boilerplate for a .NET application, structured with a Domain, Infrastructure, Core, and Application layer to promote clean architecture principles.

Project Structure
The project is organized as follows:

- Domain: Contains core entities and interfaces
- Infrastructure: Manages data access, using Entity Framework Core for persistence
- Core: Hosts core logic like MediatR for requests and FluentValidation for validation
- Application: Defines application-level features, commands, and queries
- API: Exposes the application features through a RESTful API

# Getting Started

Prerequisites
.NET SDK version compatible with your setup.
Entity Framework Core for data access.

In the project directory, run

## dotnet run --project src/EventScheduler.Api
