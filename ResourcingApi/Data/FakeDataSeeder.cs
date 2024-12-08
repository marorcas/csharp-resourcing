using Bogus;
using ResourcingApi.Data;
using ResourcingApi.Models;
using ResourcingApi.ResourcingJob;
using ResourcingApi.ResourcingTemp;

public class FakeDataSeeder
{
    private readonly ResourcingDbContext _context;

    public FakeDataSeeder(ResourcingDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        // Delete all data from the database to reset it
        Console.WriteLine("Deleting existing data...");

        // Deleting data from dependent tables first to avoid foreign key issues
        _context.JobTemps.RemoveRange(_context.JobTemps);  // Remove all JobTemp associations
        _context.Temps.RemoveRange(_context.Temps);        // Remove all Temps
        _context.Jobs.RemoveRange(_context.Jobs);          // Remove all Jobs

        // Save changes to the database (this deletes the data)
        _context.SaveChanges();

        // Create 5 jobs with today's date as the endDate
        var todayDate = DateTime.Now.Date; // Get today's date without time
        var todayJobs = new Faker<Job>()
            .RuleFor(j => j.Name, f => f.Company.Bs())
            .RuleFor(j => j.StartDate, f => f.Date.Past(1).Date)  // Random start date within the past year
            .RuleFor(j => j.EndDate, f => todayDate)  // Set the endDate to today's date

            // Generate 5 jobs with today's date as the endDate
            .Generate(5);

        // Create fake Jobs using Bogus
        var jobFaker = new Faker<Job>()
            .RuleFor(j => j.Name, f => f.Company.Bs())
            .RuleFor(j => j.StartDate, f => f.Date.Past(1).Date)  // Random start date within the past year
            .RuleFor(j => j.EndDate, f => f.Date.Future(1).Date);  // Random end date within the next year

        var jobs = jobFaker.Generate(30);

        // Combine all jobs
        var allJobs = todayJobs.Concat(jobs).ToList();
        _context.Jobs.AddRange(allJobs);
        _context.SaveChanges();

        // Create fake Temps using Bogus
        var tempFaker = new Faker<Temp>()
            .RuleFor(t => t.FirstName, f => f.Person.FirstName)
            .RuleFor(t => t.LastName, f => f.Person.LastName);

        var temps = tempFaker.Generate(20);  // Generate 20 fake temps
        _context.Temps.AddRange(temps);
        _context.SaveChanges();

        // Generate some fake JobTemp relationships, ensuring we have a good mix of jobs and temps
        var random = new Random(); // This will be used to randomly select temps for each job
        var jobTemps = new List<JobTemp>();

        foreach (var job in jobs)
        {
            // Decide if this job will have assigned temps or not (50% chance)
            bool assignTemps = random.NextDouble() < 0.5;  // 50% chance to assign temps

            if (assignTemps)
            {
                // Each Job gets a random number of Temps (1 to 3)
                var randomTempCount = random.Next(1, 4); // Randomly pick between 1 and 3 temps
                var tempIds = temps
                    .OrderBy(x => random.Next())  // Shuffle the list of temps
                    .Take(randomTempCount)  // Take the first `randomTempCount` temps
                    .Select(t => t.Id)
                    .ToList();

                foreach (var tempId in tempIds)
                {
                    jobTemps.Add(new JobTemp { JobId = job.Id, TempId = tempId });
                    job.Assigned = true;  // Mark job as assigned
                }
            }
            else
            {
                // If not assigning temps to the job, ensure the job is not marked as assigned
                job.Assigned = false;
            }
        }

        // Add all job-temp associations
        _context.JobTemps.AddRange(jobTemps);

        // Save everything to the database
        _context.SaveChanges();
    }
}
