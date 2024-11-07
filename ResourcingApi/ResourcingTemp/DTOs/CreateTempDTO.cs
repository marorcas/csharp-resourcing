using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp
{
    public class CreateTempDTO
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public List<Job>? Jobs { get; set; }
    }
}