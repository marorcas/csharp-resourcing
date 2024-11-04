namespace ResourcingApi.ResourcingJob
{
    public interface IJobService
    {
        Task<Job> CreateJob(CreateJobDTO data);
        Task<IEnumerable<Job>> GetAllJobs();
        Task<Job?> GetJobById(long id);
        Task<IEnumerable<Job>> GetJobsByAssignedStatus(bool assigned);
        Task<Job?> UpdateJobById(long id, UpdateJobDTO data);
        Task<bool> DeleteJobById(long id);
    }
}