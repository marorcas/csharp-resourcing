using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ResourcingApi.Models;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingJob.DTOs;
using ResourcingApi.ResourcingTemp;

public class JobControllerTests
{
    private readonly Mock<IJobService> _mockJobService;
    private readonly JobController _controller;

    public JobControllerTests()
    {
        _mockJobService = new Mock<IJobService>();
        _controller = new JobController(_mockJobService.Object);
    }

    [Fact]
    public async Task CreateJob_ShouldReturnCreatedResult_WhenValidDto()
    {
        var createdJob = new CreateJobDTO { Name = "Job1" };
        var expectedJob = new Job { Id = 1, Name = "Job1" };

        _mockJobService.Setup(service => service.CreateJob(It.IsAny<CreateJobDTO>()))
            .ReturnsAsync(expectedJob);

        var result = await _controller.Create(createdJob);

        var actionResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, actionResult.StatusCode);
        Assert.Equal(expectedJob, actionResult.Value);
    }

    [Fact]
    public async Task GetAllJobs_ShouldReturnOkResult_WhenThereAreJobs()
    {
        var jobList = new List<Job>
        {
            new Job { Id = 1, Name = "Job 1" },
            new Job { Id = 2, Name = "Job 2" },
            new Job { Id = 3, Name = "Job 3" }
        };

        _mockJobService.Setup(service => service.GetAllJobs())
            .ReturnsAsync(jobList);

        var result = await _controller.GetAll();

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(jobList, actionResult.Value);
    }

    [Fact]
    public async Task GetAllJobs_ShouldReturnOkResult_WhenThereAreNoJobs()
    {
        var jobList = new List<Job> { };

        _mockJobService.Setup(service => service.GetAllJobs())
            .ReturnsAsync(jobList);

        var result = await _controller.GetAll();

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(jobList, actionResult.Value);
    }

    [Fact]
    public async Task GetAllJobs_WithAssignedQuery_ShouldReturnOkResult()
    {
        Job trueJob = new Job { Id = 3, Name = "Job 3", Assigned = true };
        var jobList = new List<Job>
        {
            new Job { Id = 1, Name = "Job 1" },
            new Job { Id = 2, Name = "Job 2" },
            trueJob
        };

        _mockJobService.Setup(service => service.GetJobsByAssignedStatus(true))
            .ReturnsAsync(new List<Job> { trueJob });

        var result = await _controller.GetAll(true);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        
        var jobs = Assert.IsType<List<Job>>(actionResult.Value);
        Assert.Single(jobs);
        Assert.Equal(trueJob, jobs[0]);
    }

    [Fact]
    public async Task GetJobById_ShouldReturnOkResult_WhenJobExists()
    {
        var job = new Job { Id = 1, Name = "Job1" };

        _mockJobService.Setup(service => service.GetJobById(1))
            .ReturnsAsync(job);

        var result = await _controller.GetById(1);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(job, actionResult.Value);
    }

    [Fact]
    public async Task GetJobById_ShouldReturnNotFoundResult_WhenJobDoesNotExists()
    {
        _mockJobService.Setup(service => service.GetJobById(100))
            .ReturnsAsync((Job)null);

        var result = await _controller.GetById(100);

        var actionResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
        Assert.Equal(null, actionResult.Value);
    }

    [Fact]
    public async Task GetAssignedTo_ShouldReturnOkResult_WhenTempsAssigned()
    {
        var job = new Job { Id = 1, Name = "Job1" };
        var temp = new Temp { Id = 1, FirstName = "John", LastName = "Smith" };
        var jobTemp = new JobTemp { JobId = 1, TempId = 1 };

        _mockJobService.Setup(service => service.GetAssignedTemps(1))
            .ReturnsAsync(job.Temps);

        var result = await _controller.GetAssignedTo(1);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(job.Temps, actionResult.Value);
    }

    [Fact]
    public async Task GetAssignedTo_ShouldReturnOkResult_WhenNoTempsAssigned()
    {
        var job = new Job { Id = 1, Name = "Job1" };

        _mockJobService.Setup(service => service.GetAssignedTemps(1))
            .ReturnsAsync(job.Temps);

        var result = await _controller.GetAssignedTo(1);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        
        var returnedJobs = Assert.IsType<List<Temp>>(actionResult.Value);
        Assert.Empty(returnedJobs);
    }

    [Fact]
    public async Task UpdateJobById_ShouldReturnOkResult_WhenJobExists()
    {
        var jobUpdate = new UpdateJobDTO { Name = "Updated job" };
        var job = new Job { Id = 1, Name = "Updated job" };

        _mockJobService.Setup(service => service.UpdateJobById(1, It.IsAny<UpdateJobDTO>()))
            .ReturnsAsync(job);

        var result = await _controller.Update(1, jobUpdate);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        
        var returnedJob = Assert.IsType<Job>(actionResult.Value);
        Assert.Equal("Updated job", returnedJob.Name);
    }

    [Fact]
    public async Task UpdateJobById_ShouldReturnNotFoundResult_WhenJobDoesNotExists()
    {
        var jobUpdate = new UpdateJobDTO { Name = "Updated job" };

        _mockJobService.Setup(service => service.UpdateJobById(100, It.IsAny<UpdateJobDTO>()))
            .ReturnsAsync((Job)null);

        var result = await _controller.Update(100, jobUpdate);

        var actionResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
        Assert.Equal(null, actionResult.Value);
    }

     [Fact]
    public async Task DeleteJobById_ShouldReturnOkResult_WhenJobExists()
    {
        var job = new Job { Id = 1, Name = "Job1" };

        _mockJobService.Setup(service => service.DeleteJobById(1))
            .ReturnsAsync(true);

        var result = await _controller.Delete(1);

        var actionResult = Assert.IsType<NoContentResult>(result);
        Assert.Equal(204, actionResult.StatusCode);
    }

    [Fact]
    public async Task DeleteJobById_ShouldReturnNotFoundResult_WhenJobDoesNotExists()
    {
        _mockJobService.Setup(service => service.DeleteJobById(100))
            .ReturnsAsync(false);

        var result = await _controller.Delete(100);

        var actionResult = Assert.IsType<NotFoundResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
    }
}