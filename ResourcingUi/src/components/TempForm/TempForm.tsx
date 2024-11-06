import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TempFormData } from "./schema";
import styles from "./TempForm.module.scss";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import { deleteTempById } from "../../services/temp-services";

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
    } = useForm<TempFormData>({ resolver: zodResolver(schema), defaultValues });

    const tempsContext = useContext(TempsContext);
    if (tempsContext === undefined) {
        throw new Error('Something went wrong');
    }
    const { temps, setTemps } = tempsContext;

    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();
   
    const [firstName, setFirstName] = useState<string>(defaultValues.firstName);
    const [lastName, setLastName] = useState<string>(defaultValues.lastName);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const onDelete = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this person?");
        if (!confirmed) {
            return;
        }

        const isDeleted = await deleteTempById(id)
            .catch((e) => {
                console.log(e)
                return false;
            });

        if (isDeleted) {
            const updatedTemps = temps.filter(temp => temp.id !== id);
            setTemps(updatedTemps);
            navigate("/temps");
        }
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
                    {formType === "EDIT" && <button className={styles.Button} onClick={() => onDelete(idNumber)}>Delete</button>}
                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>
        </>
    )
}

export default TempForm;