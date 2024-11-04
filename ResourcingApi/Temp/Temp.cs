using System.ComponentModel.DataAnnotations;

namespace ResourcingApi.Temp {
    public class Temp {
        [Key]
        public long Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
    }
}