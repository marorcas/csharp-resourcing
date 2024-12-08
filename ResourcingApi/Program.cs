using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using ResourcingApi.Data;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Explicitly load the .env file from the root directory
string rootPath = Path.Combine(Directory.GetCurrentDirectory(), ".."); // Go up one level from the backend directory
string envFilePath = Path.Combine(rootPath, ".env");  // Specify the full path to the .env file
Env.Load(envFilePath);  // Load the .env file

// Access the environment variables after loading them
var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

// Build the connection string
var connectionString = $"Server={dbHost};Port={dbPort};Database={dbName};User={dbUser};Password={dbPassword}";

// // Add services to the container.
builder.Services.AddDbContext<ResourcingDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
    .LogTo(Console.WriteLine, LogLevel.Information) // Logs SQL to console
    );

builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<ITempRepository, TempRepository>();
builder.Services.AddScoped<ITempService, TempService>();
builder.Services.AddScoped<FakeDataSeeder>(); 

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Ensure the database is created and migrations applied
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ResourcingDbContext>();
    context.Database.Migrate();

    // Get the seeder and run it
    var seeder = scope.ServiceProvider.GetRequiredService<FakeDataSeeder>();
    seeder.Seed();  // Run the seeding logic
}

// Use the CORS policy
app.UseCors("AllowAllOrigins");

// Add CORS middleware before routing
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.MapControllers();

app.Run();