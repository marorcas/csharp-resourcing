import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tempSchema, TempFormData } from "./tempSchema";
import styles from "./TempForm.module.scss";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';

type FormType = 'ADD' | 'EDIT';

interface TempFormProps {
    formType?: FormType;
    defaultValues?: TempFormData;
    onSubmit: (data: TempFormData) => unknown;
}

const TempForm = ({
    formType = 'ADD', 
    defaultValues = { firstName: '', lastName: '' }, 
    onSubmit 
}: TempFormProps) => {

    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<TempFormData>({ resolver: zodResolver(tempSchema), defaultValues });
   
    const [firstName, setFirstName] = useState<string>(defaultValues.firstName);
    const [lastName, setLastName] = useState<string>(defaultValues.lastName);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
            className={styles.Form} 
            onSubmit={handleSubmit(() => onSubmit({ firstName, lastName }))}
            >

                <div className={styles.Field}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        type="text" {...register('firstName')} 
                        onChange={handleFirstNameChange}
                        placeholder="Add first name..."
                    />
                    {errors?.firstName && 
                        <small className={styles.ErrorText}>
                            {errors.firstName.message}
                        </small>
                    }
                </div>

                <div className={styles.Field}>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        type="text" {...register('lastName')} 
                        onChange={handleLastNameChange}
                        placeholder="Add last name..."
                    />
                    {errors?.lastName && 
                        <small className={styles.ErrorText}>
                            {errors.lastName.message}
                        </small>
                    }
                </div>

                <div className={styles.Buttons}>                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>
        </>
    )
}

export default TempForm;