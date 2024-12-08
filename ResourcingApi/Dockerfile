# Use the official .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the .csproj file and restore any dependencies (via NuGet)
COPY *.csproj ./
RUN dotnet restore

# Copy the entire project and publish the application
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET Runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory inside the container
WORKDIR /app

# Copy the published app from the build container
COPY --from=build /app/publish .

# Expose the port the app will run on
EXPOSE 80

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "ResourcingApi.dll"]
