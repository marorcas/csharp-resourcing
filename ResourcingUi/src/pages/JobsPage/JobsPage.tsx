import { useContext, useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./JobsPage.module.scss";
import { createJob, getAllJobs, JobResponse } from "../../services/job-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import JobForm from "../../components/JobForm/JobForm";
import { JobFormData } from "../../components/JobForm/schema";
import { formatDate } from "../../services/format";

const filterOption = {
  NAME: 'Name',
  STARTDATE: 'Start Date',
  ENDDATE: 'End Date'
}

type filterOptionType = typeof filterOption[keyof typeof filterOption];

const JobsPage = () => {
  const jobsContext = useContext(JobsContext);
  if (jobsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { jobs, setJobs } = jobsContext;

  const [selectedFilter, setSelectedFilter] = useState<filterOptionType>(filterOption.NAME);

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        const orderedData = data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setJobs(orderedData);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    const sortedJobs = [...jobs];
    if (selectedFilter === filterOption.STARTDATE) {
      sortedJobs.sort((a, b) => {
        const dateA = a.startDate ? new Date(formatDate(a.startDate)).getTime() : null;
        const dateB = b.startDate ? new Date(formatDate(b.startDate)).getTime(): null;

        // If both dates are null, they are equal
        if (dateA === null && dateB === null) return 0;

        // If one date is null, push the one with the date to the top
        if (dateA === null) return 1;
        if (dateB === null) return -1;

        // Otherwise, compare the dates
        return dateA - dateB;
      })
    } else if (selectedFilter === filterOption.ENDDATE) {
      sortedJobs.sort((a, b) => {
        const dateA = a.endDate ? new Date(formatDate(a.endDate)).getTime() : null;
        const dateB = b.endDate ? new Date(formatDate(b.endDate)).getTime(): null;

        // If both dates are null, they are equal
        if (dateA === null && dateB === null) return 0;

        // If one date is null, push the one with the date to the top
        if (dateA === null) return 1;
        if (dateB === null) return -1;

        // Otherwise, compare the dates
        return dateA - dateB;
      })
    } else {
      sortedJobs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    setJobs(sortedJobs);
  }, [selectedFilter])

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
    
  const onSubmit = async (data: JobFormData) => {
    createJob(data)
      .then((job) => {
        setJobs([...jobs, job]);
        console.log(job);
      })
      .catch((e) => console.log(e));
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className={styles.JobsPage}>
      <div className={styles.MainSection}>
        <h2>Jobs</h2>
        <p>Search Bar</p>

        <div className={styles.Filter}>
          <label htmlFor="filterBy">Filter by:</label>
          <select
            id="filterBy"
            value={selectedFilter}
            onChange={handleFilterChange}
            className={styles.FilterDropdown}
          >
            <option value={filterOption.NAME}>{filterOption.NAME}</option>
            <option value={filterOption.STARTDATE}>{filterOption.STARTDATE}</option>
            <option value={filterOption.ENDDATE}>{filterOption.ENDDATE}</option>
          </select>
        </div>

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

              <button
              className={styles.Button}
                onClick={handleCloseCreateJobForm}
              >
                Close
              </button>
            </div>
          ) : (
            <button 
              className={styles.Button}
              onClick={handleCreateJobBtnClick}
            >
              Create Job
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default JobsPage