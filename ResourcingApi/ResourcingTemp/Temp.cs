using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ResourcingApi.Models;
using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp {
    public class Temp {
        [Key]
        public long Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        [JsonIgnore]
        public List<JobTemp>? JobTemps { get; set; }
        [JsonIgnore]
        public List<Job>? Jobs => JobTemps?.Select(jt => jt.Job).ToList();
    }
}