using Microsoft.EntityFrameworkCore;
using ResourcingApi.Data;

namespace ResourcingApi.ResourcingJob
{
    public class JobRepository : IJobRepository
    {
        private readonly ResourcingDbContext _context;

        public JobRepository(ResourcingDbContext context)
        {
            _context = context;
        }

        public async Task<Job> CreateJob(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<IEnumerable<Job>> GetAllJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();
            return jobs;
        }

        public Task<Job?> GetJobById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Job>> GetJobsByAssignedStatus(bool assigned)
        {
            throw new NotImplementedException();
        }

        public Task<Job?> UpdateJobById(long id, UpdateJobDTO data)
        {
            throw new NotImplementedException();
        }

        public Task<Job?> DeleteJobById(long id)
        {
            throw new NotImplementedException();
        }
    }
}