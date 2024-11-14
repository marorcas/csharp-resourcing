import { useContext, useEffect } from "react";
import JobAssignedChart from "../../components/JobAssignedChart/JobAssignedChart"
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import { getAllJobs } from "../../services/job-services";
import { getAllTemps } from "../../services/temp-services";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import JobWeeklyChart from "../../components/JobWeeklyChart/JobWeeklyChart";
import styles from "./DashboardPage.module.scss";
import JobCard from "../../components/JobCard/JobCard";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";

const DashboardPage = () => {
  const jobsContext = useContext(JobsContext);
  if (jobsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { jobs, setJobs } = jobsContext;

  const tempContext = useContext(TempsContext);
  if (tempContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { setTemps } = tempContext;

  const todayJobs = jobs.filter((job) => {
    const todayDateString = new Date().toISOString().split('T')[0];
  
    return job.endDate && job.endDate.split('T')[0] === todayDateString;
  });

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    getAllTemps()
      .then((data) => {
        setTemps(data);
      })
      .catch((e) => console.warn(e));
  }, []);

  return (
    <div className={styles.DashboardPage}>
      <h2>Dashboard</h2>
      <div className={styles.DashboardInfo}>
        <div className={styles.Today}>
          <h3>Due Today</h3>

          <ListWrapper>
            {todayJobs.map((job) => 
              <div className={styles.Job}>
                <p>{job.name}</p>
              </div>
            )}
          </ListWrapper>
        </div>

        <div className={styles.ChartsContainer}>
          <JobAssignedChart jobData={jobs}/>

          <JobWeeklyChart jobData={jobs}/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage