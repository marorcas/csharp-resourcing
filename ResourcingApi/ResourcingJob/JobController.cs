using Microsoft.AspNetCore.Mvc;

namespace ResourcingApi.ResourcingJob
{
    [ApiController]
    [Route("/jobs")]
    public class JobController : ControllerBase
    {
        private readonly JobService _jobService;

        public JobController(JobService jobService)
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
        public async Task<ActionResult<List<Job>>> GetAll()
        {
            var jobs = await _jobService.GetAllJobs();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetById(long id)
        {
            var job = await _jobService.GetJobById(id);
            if (job == null) return NotFound();
            return Ok(job);
        }

        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetByAssigned([FromQuery] bool assigned)
        {
            var jobs = await _jobService.GetJobsByAssignedStatus(assigned);
            return Ok(jobs);
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