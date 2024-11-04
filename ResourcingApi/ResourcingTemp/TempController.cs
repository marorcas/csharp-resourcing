using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<Temp>> Create([FromBody] CreateTempDTO data)
        {
            var temp = await _tempService.CreateTemp(data);
            return StatusCode(201, temp);
        }

        [HttpGet]
        public async Task<ActionResult<List<Temp>>> GetAll()
        {
            var temps = await _tempService.GetAllTemps();
            return Ok(temps);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Temp>> GetById(long id)
        {
            var temp = await _tempService.GetTempById(id);
            if (temp == null) return NotFound();
            return Ok(temp);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Temp>> Update(long id, [FromBody] UpdateTempDTO data)
        {
            var temp = await _tempService.UpdateTempById(id, data);
            if (temp == null) return NotFound();
            return Ok(temp);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Temp>> Delete(long id)
        {
            var deleted = await _tempService.DeleteTempById(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}