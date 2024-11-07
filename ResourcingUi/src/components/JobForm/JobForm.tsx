import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { jobSchema, JobFormData } from "./jobSchema";
import styles from "./JobForm.module.scss";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import Select from "react-select/base";
import { TempResponse } from "../../services/temp-services";
import { tempSchema } from "../TempForm/tempSchema";

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
        control,
        setValue,
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<JobFormData>({ resolver: zodResolver(jobSchema), defaultValues });

    const tempContext = useContext(TempsContext);
    if (tempContext === undefined) {
        throw new Error("Something went wrong");
    }
    const { temps } = tempContext;
    const tempOptions = temps.map((temp) => ({
        value: temp.id,
        label: `${temp.firstName} ${temp.lastName}`
      }));
   
    const [name, setName] = useState<string>(defaultValues.name);
    const [startDate, setStartDate] = useState<string | null | undefined>(defaultValues.startDate);
    const [endDate, setEndDate] = useState<string | null | undefined>(defaultValues.endDate);
    const [selectedTemps, setSelectedTemps] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date ? date.toISOString().split('T')[0] : null);
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date ? date.toISOString().split('T')[0] : null);
    }

    const handleSelectChange = (selectedTemps: any) => {
        setSelectedTemps(selectedTemps || null);
      };

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

                <div>
                    <h2>Assign to</h2>
                    <Select
                        isMulti
                        options={tempOptions} // Options for the dropdown
                        value={defaultValues.temps} // Current selected values
                        onChange={handleSelectChange} // Handler for when selections change
                        getOptionLabel={(e: any) => e.label} // To display the label for each option
                        getOptionValue={(e: any) => e.value} // The value to use for each option
                        placeholder="Select temps"
                    />
                    {errors.temps && <p>{errors.temps.message}</p>}
                </div>

                <div className={styles.Buttons}>
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Save'}</button>
                </div>
            </form>
        </>
    )
}

export default JobForm;