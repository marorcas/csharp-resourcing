using ResourcingApi.Models;

namespace ResourcingApi.ResourcingJob.DTOs
{
    public class UpdateJobDTO
    {
        public string? Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Assigned { get; set; }
        public List<long>? TempIds { get; set; }
    }
}