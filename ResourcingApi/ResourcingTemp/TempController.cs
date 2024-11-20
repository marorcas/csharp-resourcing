using Microsoft.AspNetCore.Mvc;
using ResourcingApi.ResourcingTemp.DTOs;

namespace ResourcingApi.ResourcingTemp
{
    [ApiController]
    [Route("/temps")]
    public class TempController : ControllerBase
    {
        private readonly ITempService _tempService;

        public TempController(ITempService tempService)
        {
            _tempService = tempService;
        }

        [HttpPost]
        public async Task<ObjectResult> Create([FromBody] CreateTempDTO data)
        {
            var temp = await _tempService.CreateTemp(data);
            return StatusCode(201, temp);
        }

        [HttpGet]
        public async Task<ObjectResult> GetAll()
        {
            var temps = await _tempService.GetAllTemps();
            return Ok(temps);
        }

        [HttpGet("{id}")]
        public async Task<ObjectResult> GetById(long id)
        {
            var temp = await _tempService.GetTempById(id);
            if (temp == null) return NotFound(null);
            return Ok(temp);
        }

        [HttpPatch("{id}")]
        public async Task<ObjectResult> Update(long id, [FromBody] UpdateTempDTO data)
        {
            var temp = await _tempService.UpdateTempById(id, data);
            if (temp == null) return NotFound(null);
            return Ok(temp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _tempService.DeleteTempById(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}