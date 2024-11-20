using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ResourcingApi.Models;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp.DTOs;
using ResourcingApi.ResourcingTemp;

public class TempControllerTests
{
    private readonly Mock<ITempService> _mockTempService;
    private readonly TempController _controller;

    public TempControllerTests()
    {
        _mockTempService = new Mock<ITempService>();
        _controller = new TempController(_mockTempService.Object);
    }

    [Fact]
    public async Task CreateTemp_ShouldReturnCreatedResult_WhenValidDto()
    {
        var createdTemp = new CreateTempDTO { FirstName = "John", LastName = "Smith" };
        var expectedTemp = new Temp { Id = 1, FirstName = "John", LastName = "Smith" };

        _mockTempService.Setup(service => service.CreateTemp(It.IsAny<CreateTempDTO>()))
            .ReturnsAsync(expectedTemp);

        var result = await _controller.Create(createdTemp);

        var actionResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, actionResult.StatusCode);
        Assert.Equal(expectedTemp, actionResult.Value);
    }

    [Fact]
    public async Task GetAllTemps_ShouldReturnOkResult_WhenThereAreTemps()
    {
        var tempList = new List<Temp>
        {
            new Temp { Id = 1, FirstName = "John", LastName = "Smith" },
            new Temp { Id = 2, FirstName = "John", LastName = "Smith" },
            new Temp { Id = 3, FirstName = "John", LastName = "Smith" }
        };

        _mockTempService.Setup(service => service.GetAllTemps())
            .ReturnsAsync(tempList);

        var result = await _controller.GetAll();

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(tempList, actionResult.Value);
    }

    [Fact]
    public async Task GetAllTemps_ShouldReturnOkResult_WhenThereAreNoTemps()
    {
        var tempList = new List<Temp> { };

        _mockTempService.Setup(service => service.GetAllTemps())
            .ReturnsAsync(tempList);

        var result = await _controller.GetAll();

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(tempList, actionResult.Value);
    }

    [Fact]
    public async Task GetTempById_ShouldReturnOkResult_WhenTempExists()
    {
        var temp = new Temp { Id = 1, FirstName = "John", LastName = "Smith" };

        _mockTempService.Setup(service => service.GetTempById(1))
            .ReturnsAsync(temp);

        var result = await _controller.GetById(1);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        Assert.Equal(temp, actionResult.Value);
    }

    [Fact]
    public async Task GetTempById_ShouldReturnNotFoundResult_WhenTempDoesNotExists()
    {
        _mockTempService.Setup(service => service.GetTempById(100))
            .ReturnsAsync((Temp)null);

        var result = await _controller.GetById(100);

        var actionResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
        Assert.Equal(null, actionResult.Value);
    }

    [Fact]
    public async Task UpdateTempById_ShouldReturnOkResult_WhenTempExists()
    {
        var tempUpdate = new UpdateTempDTO { FirstName = "Updated" };
        var temp = new Temp { Id = 1, FirstName = "Updated", LastName = "Smith" };

        _mockTempService.Setup(service => service.UpdateTempById(1, It.IsAny<UpdateTempDTO>()))
            .ReturnsAsync(temp);

        var result = await _controller.Update(1, tempUpdate);

        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, actionResult.StatusCode);
        
        var returnedTemp = Assert.IsType<Temp>(actionResult.Value);
        Assert.Equal("Updated", returnedTemp.FirstName);
    }

    [Fact]
    public async Task UpdateTempById_ShouldReturnNotFoundResult_WhenTempDoesNotExists()
    {
        var tempUpdate = new UpdateTempDTO { FirstName = "Updated" };

        _mockTempService.Setup(service => service.UpdateTempById(100, It.IsAny<UpdateTempDTO>()))
            .ReturnsAsync((Temp)null);

        var result = await _controller.Update(100, tempUpdate);

        var actionResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
        Assert.Equal(null, actionResult.Value);
    }

     [Fact]
    public async Task DeleteTempById_ShouldReturnOkResult_WhenTempExists()
    {
        var temp = new Temp { Id = 1, FirstName = "John", LastName = "Smith" };

        _mockTempService.Setup(service => service.DeleteTempById(1))
            .ReturnsAsync(true);

        var result = await _controller.Delete(1);

        var actionResult = Assert.IsType<NoContentResult>(result);
        Assert.Equal(204, actionResult.StatusCode);
    }

    [Fact]
    public async Task DeleteTempById_ShouldReturnNotFoundResult_WhenTempDoesNotExists()
    {
        _mockTempService.Setup(service => service.DeleteTempById(100))
            .ReturnsAsync(false);

        var result = await _controller.Delete(100);

        var actionResult = Assert.IsType<NotFoundResult>(result);
        Assert.Equal(404, actionResult.StatusCode);
    }
}