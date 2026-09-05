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

ENV ASPNETCORE_URLS=http://0.0.0.0:5050
ENV PORT=5050
EXPOSE 5050

ENTRYPOINT ["dotnet", "Java.Server.dll"]
