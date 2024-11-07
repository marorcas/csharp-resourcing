using System.Text.Json.Serialization;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.Models {
    public class JobTemp
    {
        public required long JobId { get; set; }  
        [JsonIgnore]
        public Job? Job { get; set; }
        public required long TempId { get; set; }
        [JsonIgnore]
        public Temp? Temp { get; set; }
    }
}