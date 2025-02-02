FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/EventScheduler.Api/EventScheduler.Api.csproj", "EventScheduler.Api/"]
RUN dotnet restore "./EventScheduler.Api/EventScheduler.Api.csproj"
COPY . .
RUN dotnet build "src/EventScheduler.Api/EventScheduler.Api.csproj" -c %BUILD_CONFIGURATION% -o /app/build

FROM build as publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "src/EventScheduler.Api/EventScheduler.Api.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "EventScheduler.Api.dll"]