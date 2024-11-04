using Microsoft.EntityFrameworkCore;
using ResourcingApi.Data;

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

// Add services to the container.
builder.Services.AddDbContext<ResourcingDbContext>(options =>
    options.UseMySql("Server=localhost;Database=ResourcingDb;User=root;Password=MyPass;",
    new MySqlServerVersion(new Version(8, 0, 21))));
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
}

// Add CORS middleware before routing
app.UseHttpsRedirection();
app.UseRouting();

// Use the CORS policy
app.UseCors("AllowAllOrigins");

app.UseAuthorization();
app.MapControllers();

app.Run();