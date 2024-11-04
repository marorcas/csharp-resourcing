namespace ResourcingApi.ResourcingTemp
{
    public interface ITempRepository
    {
        Task CreateTemp(Temp temp);
        Task<List<Temp>> GetAllTemps();
        Task<Temp?> GetTempById(long id);
        Task UpdateTempById(Temp temp);
        Task DeleteTempById(Temp temp);
    }
}