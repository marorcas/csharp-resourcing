import { useContext, useEffect } from "react";
import JobAssignedChart from "../../components/JobAssignedChart/JobAssignedChart"
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import { getAllJobs } from "../../services/job-services";
import { getAllTemps } from "../../services/temp-services";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import JobWeeklyChart from "../../components/JobWeeklyChart/JobWeeklyChart";

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
    <div>
      <h2>Dashboard</h2>

      <JobAssignedChart jobData={jobs}/>

      {/* <JobWeeklyChart jobData={jobs}/> */}
    </div>
  )
}

export default DashboardPage