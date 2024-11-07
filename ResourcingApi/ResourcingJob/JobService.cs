using ResourcingApi.Models;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.ResourcingJob
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepo;
        private readonly ITempRepository _tempRepo;

        public JobService(IJobRepository jobRepo, ITempRepository tempRepo)
        {
            _jobRepo = jobRepo;
            _tempRepo = tempRepo;
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

            if (data.TempIds != null && data.TempIds.Count != 0)
            {
                job.JobTemps = new List<JobTemp>();

                foreach (var tempId in data.TempIds)
                {
                    var temp = await _tempRepo.GetTempById(tempId);
                    if (temp == null)
                    {
                        throw new Exception("Person not found");
                    }

                    job.JobTemps.Add(new JobTemp { JobId = job.Id, Job = job, TempId = tempId, Temp = temp });
                }

                job.Assigned = true;
            }

            await _jobRepo.CreateJob(job);
            return job;
        }

        public Task<List<Job>> GetAllJobs()
        {
            return _jobRepo.GetAllJobs();
        }

        public Task<Job?> GetJobById(long id)
        {
            return _jobRepo.GetJobById(id);
        }

        public async Task<List<Job>> GetJobsByAssignedStatus(bool assigned)
        {
            var jobs = await _jobRepo.GetAllJobs();
            
            return jobs.Where(job => job.Assigned == assigned).ToList();
        }

        public async Task<Job?> UpdateJobById(long id, UpdateJobDTO data)
        {
            var job = await _jobRepo.GetJobById(id);
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

            if (data.TempIds != null && data.TempIds.Count != 0)
            {
                if (job.JobTemps == null)
                {
                    job.JobTemps = new List<JobTemp>();
                }

                // var existingTempIds = job.Temps?.Select(t => t.Id).ToList();
                // var tempsToAdd = data.TempIds.Where(id => !existingTempIds.Contains(id)).ToList();

                foreach (var tempId in data.TempIds)
                {
                    var temp = await _tempRepo.GetTempById(tempId);

                    if (temp == null)
                    {
                        throw new Exception("Person not found");
                    }

                    if (job.Temps != null && !job.Temps.Contains(temp))
                    {
                        job.JobTemps.Add(new JobTemp { JobId = job.Id, Job = job, TempId = tempId, Temp = temp });
                    }
                }

                job.Assigned = true;
            }

            await _jobRepo.UpdateJobById(job);
            return job;
        }

        public async Task<bool> DeleteJobById(long id)
        {
            var job = await _jobRepo.GetJobById(id);
            if (job == null) return false;

            await _jobRepo.DeleteJobById(job);
            return true;
        }
    }
}