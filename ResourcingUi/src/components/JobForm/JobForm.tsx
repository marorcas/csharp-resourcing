import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { schema, JobFormData } from "./schema";
import styles from "./JobForm.module.scss";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobsContext } from "../../contexts/JobsContextProvider/JobsContextProvider";
import { deleteJobById } from "../../services/job-services";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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
        control,
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

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date ? date.toISOString() : null);
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date ? date.toISOString() : null);
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
            navigate("/jobs");
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
                    <DatePicker
                        {...register('startDate')}
                        id="startDate"
                        selected={startDate ? new Date(startDate) : null}
                        onChange={handleStartDateChange}
                        placeholderText="Select start date..."
                        dateFormat="dd-MM-yyyy"
                    />
                    {errors?.startDate && 
                        <small className={styles.ErrorText}>
                            {errors.startDate.message}
                        </small>
                    }
                </div>

                <div className={styles.Field}>
                    <label htmlFor="endDate">End date</label>
                    <DatePicker
                        {...register('endDate')}
                        id="endDate"
                        selected={endDate ? new Date(endDate) : null}
                        onChange={handleEndDateChange}
                        placeholderText="Select end date..."
                        dateFormat="dd-MM-yyyy"
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