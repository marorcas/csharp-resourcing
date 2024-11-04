using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp {
    public class Temp {
        [Key]
        public long Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        [JsonIgnore]
        public List<Job>? Jobs { get; set; }
    }
}