using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp
{
    public class UpdateTempDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<Job>? Jobs { get; set; }
    }
}