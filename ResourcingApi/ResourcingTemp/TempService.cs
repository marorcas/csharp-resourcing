
using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp
{
    public class TempService : ITempService
    {
        private readonly ITempRepository _repo;

        public TempService(ITempRepository repo)
        {
            _repo = repo;
        }

        public async Task<Temp> CreateTemp(CreateTempDTO data)
        {
            var temp = new Temp
            {
                FirstName = data.FirstName,
                LastName = data.LastName
            };

            await _repo.CreateTemp(temp);
            return temp;
        }

        public Task<List<Temp>> GetAllTemps()
        {
            return _repo.GetAllTemps();
        }

        public Task<Temp?> GetTempById(long id)
        {
            return _repo.GetTempById(id);
        }

        public async Task<Temp?> UpdateTempById(long id, UpdateTempDTO data)
        {
            var temp = await _repo.GetTempById(id);
            if (temp == null) return null;

            if (!string.IsNullOrWhiteSpace(data.FirstName))
            {
                temp.FirstName = data.FirstName;
            }

            if (!string.IsNullOrWhiteSpace(data.LastName))
            {
                temp.LastName = data.LastName;
            }

            if (data.Jobs != null && data.Jobs.Count != 0)
            {
                if (temp.Jobs == null)
                {
                    temp.Jobs = new List<Job>();
                }

                foreach (var job in data.Jobs)
                {
                    if (!temp.Jobs.Contains(job))
                    {
                        temp.Jobs.Add(job);
                        
                        // Also add the temp to the job
                        if (job.Temps == null)
                        {
                            job.Temps = new List<Temp>();
                        }
                        job.Temps.Add(temp);
                        job.Assigned = true;
                    }
                }
            }

            await _repo.UpdateTempById(temp);
            return temp;
        }

        public async Task<bool> DeleteTempById(long id)
        {
            var temp = await _repo.GetTempById(id);
            if (temp == null) return false;

            await _repo.DeleteTempById(temp);
            return true;
        }
    }
}