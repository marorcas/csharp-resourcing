using Microsoft.AspNetCore.Mvc;

namespace ResourcingApi.ResourcingJob
{
    [ApiController]
    [Route("/jobs")]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public async Task<ActionResult<Job>> Create([FromBody] CreateJobDTO data)
        {
            var job = await _jobService.CreateJob(data);
            return StatusCode(201, job);
        }

        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetAll([FromQuery] bool? assigned = null)
        {
            List<Job> jobs;
            if (assigned.HasValue)
            {
                jobs = await _jobService.GetJobsByAssignedStatus(assigned.Value);
                return Ok(jobs);
            }
            jobs = await _jobService.GetAllJobs();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetById(long id)
        {
            var job = await _jobService.GetJobById(id);
            if (job == null) return NotFound();
            return Ok(job);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Job>> Update(long id, [FromBody] UpdateJobDTO data)
        {
            var job = await _jobService.UpdateJobById(id, data);
            if (job == null) return NotFound();
            return Ok(job);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Job>> Delete(long id)
        {
            var deleted = await _jobService.DeleteJobById(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}