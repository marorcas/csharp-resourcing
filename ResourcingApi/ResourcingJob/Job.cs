using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.ResourcingJob 
{
    public class Job 
    {
        [Key]
        public long Id { get; set; }
        public required string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Assigned { get; set; }
        [JsonIgnore]
        public List<Temp>? Temps { get; set; }
    }
}