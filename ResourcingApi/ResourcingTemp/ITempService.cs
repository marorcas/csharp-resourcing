using ResourcingApi.ResourcingTemp.DTOs;

namespace ResourcingApi.ResourcingTemp
{
    public interface ITempService
    {  
        Task<Temp> CreateTemp(CreateTempDTO data);
        Task<List<Temp>> GetAllTemps();
        Task<Temp?> GetTempById(long id);
        Task<Temp?> UpdateTempById(long id, UpdateTempDTO data);
        Task<bool> DeleteTempById(long id);
    }
}