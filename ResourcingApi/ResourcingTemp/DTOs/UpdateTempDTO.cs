using ResourcingApi.Models;

namespace ResourcingApi.ResourcingTemp.DTOs
{
    public class UpdateTempDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<long>? JobIds { get; set; }
    }
}