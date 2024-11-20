using Microsoft.AspNetCore.Mvc;
using ResourcingApi.ResourcingJob.DTOs;
using ResourcingApi.ResourcingTemp;

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
        public async Task<ObjectResult> Create([FromBody] CreateJobDTO data)
        {
            var job = await _jobService.CreateJob(data);
            return StatusCode(201, job);
        }

        [HttpGet]
        public async Task<ObjectResult> GetAll([FromQuery] bool? assigned = null)
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
        public async Task<ObjectResult> GetById(long id)
        {
            var job = await _jobService.GetJobById(id);
            if (job == null) return NotFound(null);
            return Ok(job);
        }

        [HttpGet("{id}/assignedto")]
        public async Task<ObjectResult> GetAssignedTo(long id)
        {
            var temps = await _jobService.GetAssignedTemps(id);
            return Ok(temps);
        }

        [HttpPatch("{id}")]
        public async Task<ObjectResult> Update(long id, [FromBody] UpdateJobDTO data)
        {
            var job = await _jobService.UpdateJobById(id, data);
            if (job == null) return NotFound(null);
            return Ok(job);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _jobService.DeleteJobById(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}