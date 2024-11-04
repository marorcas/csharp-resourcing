using Microsoft.EntityFrameworkCore;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.Data
{
    public class ResourcingDbContext : DbContext
    {
        public ResourcingDbContext(DbContextOptions<ResourcingDbContext> options) : base(options) { }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Temp> Temps { get; set; }
    }
}