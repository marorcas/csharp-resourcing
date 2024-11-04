namespace ResourcingApi.ResourcingJob
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _repo;

        public JobService(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<Job> CreateJob(CreateJobDTO data)
        {
            var job = new Job
            {
                Name = data.Name
            };

            if (data.StartDate.HasValue)
            {
                job.StartDate = data.StartDate.Value;
            }

            if (data.EndDate.HasValue)
            {
                job.EndDate = data.EndDate.Value;
            }

            await _repo.CreateJob(job);
            return job;
        }

        public Task<List<Job>> GetAllJobs()
        {
            return _repo.GetAllJobs();
        }

        public Task<Job?> GetJobById(long id)
        {
            return _repo.GetJobById(id);
        }

        public async Task<List<Job>> GetJobsByAssignedStatus(bool assigned)
        {
            var jobs = await _repo.GetAllJobs();
            
            return jobs.Where(job => job.Assigned == assigned).ToList();
        }

        public async Task<Job?> UpdateJobById(long id, UpdateJobDTO data)
        {
            var job = await _repo.GetJobById(id);
            if (job == null) return null;

            if (!string.IsNullOrWhiteSpace(data.Name))
            {
                job.Name = data.Name;
            }

            if (data.StartDate.HasValue)
            {
                job.StartDate = data.StartDate.Value;
            }

            if (data.EndDate.HasValue)
            {
                job.EndDate = data.EndDate.Value;
            }

            if (data.Assigned.HasValue)
            {
                job.Assigned = data.Assigned.Value;
            }

            await _repo.UpdateJobById(job);
            return job;
        }

        public async Task<bool> DeleteJobById(long id)
        {
            var job = await _repo.GetJobById(id);
            if (job == null) return false;

            await _repo.DeleteJobById(job);
            return true;
        }
    }
}