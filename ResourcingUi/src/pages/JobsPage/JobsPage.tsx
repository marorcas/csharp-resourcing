import { useContext, useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./JobsPage.module.scss";
import { createJob, getAllJobs, JobResponse, updateJobById } from "../../services/job-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import JobForm from "../../components/JobForm/JobForm";
import { JobFormData } from "../../components/JobForm/jobSchema";
import { filterOption, filterOptionType, sortJobs } from "../../services/job-format";


const JobsPage = () => {
  const jobsContext = useContext(JobsContext);
  if (jobsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { jobs, setJobs } = jobsContext;

  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<filterOptionType>(filterOption.NAME);
  const [isCreateJobBtnVisible, setIsCreateJobBtnVisible] = useState<boolean>(true);
  const [isCreateJobFormOpen, setIsCreateJobFormOpen] = useState<boolean>(false);
  const [isEditJobFormOpen, setIsEditJobFormOpen] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isTickVisible, setIsTickVisible] = useState<boolean>(false);

  const handleJobClick = (job: JobResponse) => {
    setSelectedJob(job);
    setIsCreateJobBtnVisible(false);
  }

  const handleCloseJob = () => {
    setSelectedJob(null);
    setIsCreateJobBtnVisible(true);
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };
  
  const handleCreateJobBtnClick = () => {
    setIsCreateJobFormOpen(true);
    setIsCreateJobBtnVisible(false);
  }

  const handleCloseCreateJobForm = () => {
    setIsCreateJobFormOpen(false);
    setIsCreateJobBtnVisible(true);
  }

  const handleEditJobBtnClick = () => {
    setIsEditJobFormOpen(true);
    setIsCreateJobBtnVisible(false);
  }

  const handleCloseEditJobForm = () => {
    setIsEditJobFormOpen(false);
    setIsCreateJobBtnVisible(true);
  }
    
  const onCreateSubmit = async (data: JobFormData) => {
    createJob(data)
      .then((job) => {
        const updatedJobs = [...jobs, job];
        const sortedUpdatedJobs = sortJobs(updatedJobs, selectedFilter);
        setJobs(sortedUpdatedJobs);
        setIsFormSubmitted(true);
        setIsCreateJobFormOpen(false);
        setIsTickVisible(true);

        setTimeout(() => {
          setIsTickVisible(false);
          setIsCreateJobFormOpen(false);
          setIsCreateJobBtnVisible(true);
        }, 2000);
        console.log(job);
      })
      .catch((e) => console.log(e));
  }
  
  const onEditSubmit = async (id: number, data: JobFormData) => {
    updateJobById(id, data)
      .then(() => {
          const updatedJobs = jobs.map((job) => job.id === id ? { ...job, ...data } : job);
          const sortedUpdatedJobs = sortJobs(updatedJobs, selectedFilter);
          setJobs(sortedUpdatedJobs);
          setIsFormSubmitted(true);
          setIsEditJobFormOpen(false);
          setIsTickVisible(true);
          setSelectedJob(null);

          setTimeout(() => {
            setIsTickVisible(false);
            setIsCreateJobFormOpen(false);
            setIsCreateJobBtnVisible(true);
          }, 2000);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        const orderedData = sortJobs(data, selectedFilter);
        setJobs(orderedData);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    const sortedJobs = [...jobs];
    setJobs(sortJobs(sortedJobs, selectedFilter));
  }, [selectedFilter]);

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
          {isEditJobFormOpen ? ( 
            <div className={styles.CreateJobFormPopUp}>
              <h3>Edit Job</h3>

              <JobForm 
                formType="EDIT"
                defaultValues={selectedJob}
                onSubmit={(data) => onEditSubmit(selectedJob.id, data)}
              />

              <button
                className={styles.Button}
                onClick={handleCloseEditJobForm}
              >
                Close
              </button>

              {isTickVisible && !isCreateJobBtnVisible && (
                <div className={styles.TickAnimation}>
                  <span>✔</span>
                  <p>Edited successfully!</p>
                </div>
              )}

            </div>
          ) : (
            <div className={styles.JobInfo}>
              <h2>{selectedJob.name}</h2>
              <p>Start date: {selectedJob.startDate ? selectedJob.startDate : "not set"}</p>
              <p>End date: {selectedJob.endDate ? selectedJob.endDate : "not set"}</p>
              <p>Assigned to: {selectedJob.temps ? selectedJob.temps.map(person => `${person.firstName} ${person.lastName}`).join(', ') : "none"}</p>
              <button 
                className={styles.Button}
                onClick={handleEditJobBtnClick}
              >
                Edit
              </button>
              <button 
                className={styles.Button}
                onClick={handleCloseJob}
              >
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.CreateJobContainer}>
          {isCreateJobFormOpen && ( 
            <div className={styles.CreateJobFormPopUp}>
              <h3>Create New Job</h3>
              <JobForm onSubmit={onCreateSubmit}/>

              <button
              className={styles.Button}
                onClick={handleCloseCreateJobForm}
              >
                Close
              </button>
            </div>
          )}

          {isTickVisible && !isCreateJobBtnVisible && (
            <div className={styles.TickAnimation}>
              <span>✔</span>
            </div>
          )}

          {isCreateJobBtnVisible && !isTickVisible && (
            <button className={styles.Button} onClick={handleCreateJobBtnClick}>
              Create Job
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default JobsPage