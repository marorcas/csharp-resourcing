using Microsoft.EntityFrameworkCore;
using ResourcingApi.Models;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.Data
{
    public class ResourcingDbContext : DbContext
    {
        public ResourcingDbContext(DbContextOptions<ResourcingDbContext> options) : base(options) { }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Temp> Temps { get; set; }
        public DbSet<JobTemp> JobTemps { get; set; }

         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Enable SQL query logging in console
            optionsBuilder
                .UseMySql("Server=localhost;Database=ResourcingDb;User=root;Password=MyPass;", ServerVersion.AutoDetect("Server=localhost;Database=ResourcingDb;User=root;Password=MyPass;"))
                .LogTo(Console.WriteLine, LogLevel.Information); // Logs SQL to console
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the many-to-many relationship using JobTemp as the join table
            modelBuilder.Entity<JobTemp>()
                    .HasKey(jt => new { jt.JobId, jt.TempId }); // Composite primary key

            modelBuilder.Entity<JobTemp>()
                .HasOne(jt => jt.Job) // Each JobTemp is related to one Job
                .WithMany(j => j.JobTemps) // One Job can have many JobTemps
                .HasForeignKey(jt => jt.JobId); // Foreign key on JobId

            modelBuilder.Entity<JobTemp>()
                .HasOne(jt => jt.Temp) // Each JobTemp is related to one Temp
                .WithMany(t => t.JobTemps) // One Temp can have many JobTemps
                .HasForeignKey(jt => jt.TempId);
        }
    }
}