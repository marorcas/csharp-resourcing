import { useContext, useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./JobsPage.module.scss";
import { getAllJobs, JobResponse } from "../../services/job-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";

const JobsPage = () => {
  const jobsContext = useContext(JobsContext);
  if (jobsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { jobs, setJobs } = jobsContext;

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((e) => console.warn(e));
  }, []);

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
          {jobs.map((job) => 
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