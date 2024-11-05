import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, JobFormData } from "./schema";
import styles from "./JobForm.module.scss";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import { deleteJobById } from "../../services/job-services";

type FormType = 'ADD' | 'EDIT';

interface JobFormProps {
    formType?: FormType;
    defaultValues?: JobFormData;
    onSubmit: (data: JobFormData) => unknown;
}

const JobForm = ({
    formType = 'ADD', 
    defaultValues = { name: '' }, 
    onSubmit 
}: JobFormProps) => {

    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<JobFormData>({ resolver: zodResolver(schema), defaultValues });

    const jobsContext = useContext(JobsContext);
    if (jobsContext === undefined) {
        throw new Error('Something went wrong');
    }
    const { jobs, setJobs } = jobsContext;

    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();
   
    const [name, setName] = useState<string>(defaultValues.name);
    const [startDate, setStartDate] = useState<string | null | undefined>(defaultValues.startDate);
    const [endDate, setEndDate] = useState<string | null | undefined>(defaultValues.endDate);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    }

    const onDelete = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) {
            return;
        }

        const isDeleted = await deleteJobById(id)
            .catch((e) => {
                console.log(e)
                return false;
            });

        if (isDeleted) {
            const updatedJobs = jobs.filter(job => job.id !== id);
            setJobs(updatedJobs);
            navigate("/");
        }
    }

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
            className={styles.Form} 
            onSubmit={handleSubmit(() => onSubmit({ name, startDate, endDate }))}
            >

                <div className={styles.Field}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" {...register('name')} 
                        onChange={handleNameChange}
                        placeholder="Add name..."
                    />
                    {errors?.name && 
                        <small className={styles.ErrorText}>
                            {errors.name.message}
                        </small>
                    }
                </div>

                <div className={styles.Field}>
                    <label htmlFor="startDate">Start date</label>
                    <input 
                        id="startDate" 
                        type="text" {...register('startDate')} 
                        onChange={handleStartDateChange}
                        placeholder="Add start date..."
                    />
                    {errors?.startDate && 
                        <small className={styles.ErrorText}>
                            {errors.startDate.message}
                        </small>
                    }
                </div>

                <div className={styles.Field}>
                    <label htmlFor="endDate">End date</label>
                    <input 
                        id="endDate" 
                        type="text" {...register('endDate')} 
                        onChange={handleEndDateChange}
                        placeholder="Add end date..."
                    />
                    {errors?.endDate && 
                        <small className={styles.ErrorText}>
                            {errors.endDate.message}
                        </small>
                    }
                </div>

                <div className={styles.Buttons}>
                    {formType === "EDIT" && <button className={styles.Button} onClick={() => onDelete(idNumber)}>Delete</button>}
                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>
        </>
    )
}

export default JobForm;