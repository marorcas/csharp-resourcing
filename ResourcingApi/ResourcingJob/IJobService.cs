namespace ResourcingApi.ResourcingJob
{
    public interface IJobService
    {
        Task<Job> CreateJob(CreateJobDTO data);
        Task<List<Job>> GetAllJobs();
        Task<Job?> GetJobById(long id);
        Task<List<Job>> GetJobsByAssignedStatus(bool assigned);
        Task<Job?> UpdateJobById(long id, UpdateJobDTO data);
        Task<bool> DeleteJobById(long id);
    }
}