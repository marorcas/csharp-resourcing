using Microsoft.EntityFrameworkCore;
using ResourcingApi.Data;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.ResourcingJob
{
    public class JobRepository : IJobRepository
    {
        private readonly ResourcingDbContext _context;

        public JobRepository(ResourcingDbContext context)
        {
            _context = context;
        }

        public async Task CreateJob(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Job>> GetAllJobs()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<Job?> GetJobById(long id)
        {
            return await _context.Jobs
                .Include(j => j.Temps)  // Eager load the related Temps
                .FirstOrDefaultAsync(j => j.Id == id);  // Use FirstOrDefaultAsync to safely handle null
        }

        public async Task UpdateJobById(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteJobById(Job job)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}