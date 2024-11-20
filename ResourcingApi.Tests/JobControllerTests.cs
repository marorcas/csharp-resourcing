using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingJob.DTOs;

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
}