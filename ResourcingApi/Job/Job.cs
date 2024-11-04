using System.ComponentModel.DataAnnotations;

namespace ResourcingApi.Job {
    public class Job {
        [Key]
        public long Id { get; set; }
        public required string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Assigned { get; set; }
    }
}