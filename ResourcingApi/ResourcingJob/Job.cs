using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ResourcingApi.Models;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.ResourcingJob 
{
    public class Job 
    {
        [Key]
        public long Id { get; set; }
        public required string Name { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? StartDate { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? EndDate { get; set; }
        public bool Assigned { get; set; }
        [JsonIgnore]
        public List<JobTemp>? JobTemps { get; set; }
        [JsonIgnore]
        public List<Temp>? Temps => JobTemps?.Select(jt => jt.Temp).ToList();
    }
}