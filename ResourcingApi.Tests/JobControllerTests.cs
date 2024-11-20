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
        var createJobDto = new CreateJobDTO { Name = "Job1" };
        var createdJob = new Job { Id = 1, Name = "Job1" };

        _mockJobService.Setup(service => service.CreateJob(It.IsAny<CreateJobDTO>()))
            .ReturnsAsync(createdJob);

        var result = await _controller.Create(createJobDto);

        var actionResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, actionResult.StatusCode);
        Assert.Equal(createdJob, actionResult.Value);
    }
}