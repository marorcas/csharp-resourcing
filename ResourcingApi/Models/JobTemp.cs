using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

namespace ResourcingApi.Models {
    public class JobTemp
    {
        public required long JobId { get; set; }  
        public required Job Job { get; set; }
        public required long TempId { get; set; }
        public required Temp Temp { get; set; }
    }
}