import { useContext, useEffect, useState } from "react";
import styles from "./PeoplePage.module.scss";
import { createTemp, getAllTemps, TempResponse } from "../../services/temp-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import PersonCard from "../../components/PersonCard/PersonCard";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import { TempFormData } from "../../components/TempForm/schema";
import TempForm from "../../components/TempForm/TempForm";

const PeoplePage = () => {
  const tempsContext = useContext(TempsContext);
  if (tempsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { temps, setTemps } = tempsContext;

  useEffect(() => {
    getAllTemps()
      .then((data) => {
        setTemps(data);
      })
      .catch((e) => console.warn(e));
  }, []);

  const [selectedPerson, setSelectedPerson] = useState<TempResponse | null>(null);
  const [isCreateTempFormOpen, setIsCreateTempFormOpen] = useState<boolean>(false);

  const handlePersonClick = (person: TempResponse) => {
    setSelectedPerson(person);
  }

  const handleClosePerson = () => {
    setSelectedPerson(null);
  }

  const handleCreateTempBtnClick = () => {
    setIsCreateTempFormOpen(true);
  }

  const handleCloseCreateTempForm = () => {
    setIsCreateTempFormOpen(false);
  }
    
  const onSubmit = async (data: TempFormData) => {
    createTemp(data)
      .then((temp) => {
        setTemps([...temps, temp]);
        console.log(temp);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className={styles.PeoplePage}>
      <div className={styles.MainSection}>
        <h2>People</h2>
        <p>Search Bar</p>
        <p>Filter By</p>
        <ListWrapper>
          {temps.map((person) => 
            <PersonCard key={person.id} person={person} onClick={handlePersonClick}/>
          )}
        </ListWrapper>
      </div>

      {selectedPerson ? (
        <div className={styles.TempPopUp}>
          <h2>{`${selectedPerson.firstName} ${selectedPerson.lastName}`}</h2>
          <p>Person Details</p>
          <button onClick={handleClosePerson}>Close</button>
        </div>
      ): (
        <div className={styles.CreateTempContainer}>
          {isCreateTempFormOpen ? ( 
            <div className={styles.CreateTempFormPopUp}>
              <h2>Create New Person</h2>

              <TempForm onSubmit={onSubmit}/>

              <button 
                className={styles.Button}
                onClick={handleCloseCreateTempForm}
              >
                Close
              </button>
            </div>
          ) : (
            <button 
              className={styles.Button}
              onClick={handleCreateTempBtnClick}
            >
              Create Person
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PeoplePage;