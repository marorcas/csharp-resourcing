import { useContext, useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./JobsPage.module.scss";
import { createJob, getAllJobs, JobResponse } from "../../services/job-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import JobForm from "../../components/JobForm/JobForm";
import { useNavigate } from "react-router-dom";
import { JobFormData } from "../../components/JobForm/schema";

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
  const [isCreateJobFormOpen, setIsCreateJobFormOpen] = useState<boolean>(false);

  const handleJobClick = (job: JobResponse) => {
    setSelectedJob(job);
  }

  const handleCloseJob = () => {
    setSelectedJob(null);
  }
  
  const handleCreateJobBtnClick = () => {
    setIsCreateJobFormOpen(true);
  }

  const handleCloseCreateJobForm = () => {
    setIsCreateJobFormOpen(false);
  }

  const navigate = useNavigate();
    
  const onSubmit = async (data: JobFormData) => {
    createJob(data)
      .then((job) => {
        setJobs([...jobs, job]);
        console.log(job);
        navigate('/jobs');
      })
      .catch((e) => console.log(e));
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

      {selectedJob ? (
        <div className={styles.JobPopUp}>
          <h2>{selectedJob.name}</h2>
          <p>Job Details</p>
          <button onClick={handleCloseJob}>Close</button>
        </div>
      ) : (
        <div className={styles.CreateJobContainer}>
          {isCreateJobFormOpen ? ( 
            <div className={styles.CreateJobFormPopUp}>
              <h2>Create New Job</h2>

              <JobForm onSubmit={onSubmit}/>

              <button onClick={handleCloseCreateJobForm}>Close</button>
            </div>
          ) : (
            <button onClick={handleCreateJobBtnClick}>Create Job</button>
          )}
        </div>
      )}
    </div>
  )
}

export default JobsPage