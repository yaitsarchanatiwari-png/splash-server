FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY Java.Server.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish "Java.Server.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

VOLUME ["/app/data"]

EXPOSE 5050
EXPOSE 10000

ENTRYPOINT ["dotnet", "Splash.Server.dll"]
