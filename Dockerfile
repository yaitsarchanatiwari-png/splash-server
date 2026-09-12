FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY Java.Server.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish "Java.Server.csproj" -c Release -o /app/publish

RUN apt-get update && apt-get install -y unzip && \
    mkdir -p /app/publish/wwwroot /app/publish/data/updates && \
    if [ -f /src/data/updates/Splash.zip ]; then \
        unzip -o /src/data/updates/Splash.zip -d /app/publish/wwwroot/ && \
        cp /app/publish/wwwroot/Splash.exe /app/publish/data/updates/Splash.exe && \
        cp /app/publish/wwwroot/Splash.exe /app/publish/wwwroot/SplashSetup.exe && \
        cp /app/publish/wwwroot/Splash.exe /app/publish/data/updates/SplashSetup.exe; \
    else \
        echo "No embedded Splash.zip found, continuing build."; \
    fi

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/wwwroot /app/wwwroot
COPY --from=build /src/data /app/data
RUN mkdir -p /app/data/updates /app/data/keys && \
    if [ -f /app/publish/wwwroot/Splash.exe ]; then \
        cp /app/publish/wwwroot/Splash.exe /app/wwwroot/Splash.exe && \
        cp /app/publish/wwwroot/Splash.exe /app/data/updates/Splash.exe && \
        cp /app/publish/wwwroot/Splash.exe /app/wwwroot/SplashSetup.exe && \
        cp /app/publish/wwwroot/Splash.exe /app/data/updates/SplashSetup.exe; \
    fi

EXPOSE 5050
EXPOSE 10000

ENTRYPOINT ["dotnet", "Splash.Server.dll"]
