using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.ResourcingJob
{
    public class UpdateJobDTO
    {
        public string? Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Assigned { get; set; }
        public List<Temp>? Temps { get; set; }
    }
}