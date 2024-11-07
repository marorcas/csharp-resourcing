import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, JobFormData } from "./schema";
import styles from "./JobForm.module.scss";
import { useState } from "react";
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
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<JobFormData>({ resolver: zodResolver(schema), defaultValues });
   
    const [name, setName] = useState<string>(defaultValues.name);
    const [startDate, setStartDate] = useState<string | null | undefined>(defaultValues.startDate);
    const [endDate, setEndDate] = useState<string | null | undefined>(defaultValues.endDate);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date ? date.toISOString().split('T')[0] : null);
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date ? date.toISOString().split('T')[0] : null);
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
                        dateFormat="yyyy-MM-dd"
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
                        dateFormat="yyyy-MM-dd"
                    />
                    {errors?.endDate && 
                        <small className={styles.ErrorText}>
                            {errors.endDate.message}
                        </small>
                    }
                </div>

                <div className={styles.Buttons}>
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Save'}</button>
                </div>
            </form>
        </>
    )
}

export default JobForm;