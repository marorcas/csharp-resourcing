using ResourcingApi.Models;

namespace ResourcingApi.ResourcingTemp.DTOs
{
    public class CreateTempDTO
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public List<long>? JobIds { get; set; }
    }
}