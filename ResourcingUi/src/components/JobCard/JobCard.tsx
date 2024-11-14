import { JobResponse } from "../../services/job-services";
import styles from "./JobCard.module.scss";

interface JobCardProps {
    job: JobResponse;
    onClick?: (job: JobResponse) => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <li 
      className={styles.JobCard}
      onClick={onClick? () => onClick(job) : undefined}
    >
        <p>{job.name}</p>

        <div className={styles.DatesContainer}>
          <p className={styles.Date}>Start date: {job.startDate ? job.startDate : "not set"}</p>
          <p className={styles.Date}>End date: {job.endDate ? job.endDate : "not set"}</p>
        </div>
    </li>
  )
}

export default JobCard;