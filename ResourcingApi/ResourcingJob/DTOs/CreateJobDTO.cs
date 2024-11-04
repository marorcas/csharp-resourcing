namespace ResourcingApi.ResourcingJob
{
    public class CreateJobDTO
    {
        public required string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Assigned { get; set; }
    }
}