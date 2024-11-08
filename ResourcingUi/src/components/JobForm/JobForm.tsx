import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobSchema, JobFormData } from "./jobSchema";
import styles from "./JobForm.module.scss";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";

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
    } = useForm<JobFormData>({ resolver: zodResolver(jobSchema), defaultValues });

    const tempContext = useContext(TempsContext);
    if (tempContext === undefined) {
        throw new Error("Something went wrong");
    }
    const { temps } = tempContext;
   
    const [name, setName] = useState<string>(defaultValues.name);
    const [startDate, setStartDate] = useState<string | null | undefined>(defaultValues.startDate);
    const [endDate, setEndDate] = useState<string | null | undefined>(defaultValues.endDate);
    const [tempIds, setTempIds] = useState<number[] | null | undefined>(defaultValues.tempIds);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date ? date.toISOString().split('T')[0] : null);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date ? date.toISOString().split('T')[0] : null);
    };

    // Filter temps based on search term
    const filteredTemps = temps.filter(
        (temp) =>
        temp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle adding a temp to the selected list
    const handleAddTemp = (tempId: number) => {
        if (tempIds && !tempIds.includes(tempId)) {
            setTempIds([...tempIds, tempId]);
        } else {
            setTempIds([tempId]);
        }
    };

    // Handle removing a temp from the selected list
    const handleRemoveTemp = (tempId: number) => {
        if (tempIds) {
            setTempIds(tempIds.filter((id) => id !== tempId));
        }
    };

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
                className={styles.Form} 
                onSubmit={handleSubmit(() => onSubmit({ name, startDate, endDate, tempIds }))}
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

                <div className={styles.Field}>
                    <label htmlFor="search">Assign to</label>

                    <input
                        className={styles.SearchBar}
                        type="text"
                        id="search"
                        placeholder="Search for people..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className={styles.AssignToContainer}>
                    {/* Filtered temps list */}
                    <div className={styles.AssignToList}>
                        <ul>
                            {filteredTemps.map((temp) => (
                            <li key={temp.id}>
                                {temp.firstName} {temp.lastName}{" "}
                                <button
                                type="button"
                                onClick={() => handleAddTemp(temp.id)}
                                >
                                Add
                                </button>
                            </li>
                            ))}
                        </ul>
                    </div>

                    {/* List of selected temps */}
                    <div className={styles.SelectedTemps}>
                        <ul id="selectedTemps">
                            {tempIds?.map((tempId) => {
                            const temp = temps.find((t) => t.id === tempId);
                            return (
                                <li key={tempId}>
                                {temp?.firstName} {temp?.lastName}{" "}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTemp(tempId)}
                                >
                                    Remove
                                </button>
                                </li>
                            );
                            })}
                        </ul>
                    </div>
                </div>

                <div className={styles.Buttons}>
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Save'}</button>
                </div>
            </form>
        </>
    )
}

export default JobForm;