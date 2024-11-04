using Microsoft.EntityFrameworkCore;
using ResourcingApi.Data;

namespace ResourcingApi.ResourcingTemp
{
    public class TempRepository : ITempRepository
    {
        private readonly ResourcingDbContext _context;

        public TempRepository(ResourcingDbContext context)
        {
            _context = context;
        }

        public async Task CreateTemp(Temp temp)
        {
            _context.Temps.Add(temp);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Temp>> GetAllTemps()
        {
            return await _context.Temps.ToListAsync();
        }

        public async Task<Temp?> GetTempById(long id)
        {
            return await _context.Temps.FindAsync(id);
        }

        public async Task UpdateTempById(Temp temp)
        {
            _context.Temps.Update(temp);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTempById(Temp temp)
        {
            _context.Temps.Remove(temp);
            await _context.SaveChangesAsync();
        }
    }
}