namespace ResourcingApi.ResourcingJob
{
    public interface IJobRepository
    {
        Task<Job> CreateJob(Job job);
        Task<IEnumerable<Job>> GetAllJobs();
        Task<Job?> GetJobById(long id);
        Task<IEnumerable<Job>> GetJobsByAssignedStatus(bool assigned);
        Task<Job?> UpdateJobById(long id, UpdateJobDTO data);
        Task<Job?> DeleteJobById(long id);
    }
}