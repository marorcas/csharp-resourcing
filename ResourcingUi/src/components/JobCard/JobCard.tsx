import { JobResponse } from "../../services/job-services";
import styles from "./JobCard.module.scss";

interface JobCardProps {
    job: JobResponse;
    onClick: (job: JobResponse) => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <li 
      className={styles.JobCard}
      onClick={() => onClick(job)}
    >
        <p>{job.name}</p>
        <p>{job.startDate}</p>
        <p>{job.endDate}</p>
    </li>
  )
}

export default JobCard;