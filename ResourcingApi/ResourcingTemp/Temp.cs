using System.ComponentModel.DataAnnotations;
using ResourcingApi.ResourcingJob;

namespace ResourcingApi.ResourcingTemp {
    public class Temp {
        [Key]
        public long Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public ICollection<Job>? Jobs { get; set; } = [];
    }
}