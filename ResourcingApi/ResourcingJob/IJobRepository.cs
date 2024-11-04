namespace ResourcingApi.ResourcingJob
{
    public interface IJobRepository
    {
        Task CreateJob(Job job);
        Task<IEnumerable<Job>> GetAllJobs();
        Task<Job> GetJobById(long id);
        Task UpdateJobById(Job job);
        Task DeleteJobById(Job job);
    }
}