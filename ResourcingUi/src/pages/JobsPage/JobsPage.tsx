import { useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./JobsPage.module.scss";
import { JobResponse } from "../../services/job-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";

const JobsPage = () => {
  const tempJobs = [
    {id: 1, name: "Job 1", startDate: "1/10/2024", endDate: "22/10/2024"},
    {id: 2, name: "Job 2", startDate: "1/10/2024", endDate: "22/10/2024"},
    {id: 3, name: "Job 3", startDate: "1/10/2024", endDate: "27/10/2024"},
    {id: 4, name: "Job 4", startDate: "1/10/2024", endDate: "26/10/2024"},
    {id: 5, name: "Job 5", startDate: "1/10/2024", endDate: "29/10/2024"}
  ]

  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);

  const handleJobClick = (job: JobResponse) => {
    setSelectedJob(job);
  }

  const handleCloseJob = () => {
    setSelectedJob(null);
  }

  return (
    <div className={styles.JobsPage}>
      <div className={styles.MainSection}>
        <h2>Jobs</h2>
        <p>Search Bar</p>
        <p>Filter By</p>
        <ListWrapper>
          {tempJobs.map((job) => 
            <JobCard key={job.id} job={job} onClick={handleJobClick}/>
          )}
        </ListWrapper>
      </div>

      {selectedJob && (
        <div className={styles.PopUpSection}>
          <h2>{selectedJob.name}</h2>
          <p>Job Details</p>
          <button onClick={handleCloseJob}>Close</button>
        </div>
      )}
    </div>
  )
}

export default JobsPage