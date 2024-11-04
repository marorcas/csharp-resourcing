import { useContext, useEffect, useState } from "react";
import styles from "./PeoplePage.module.scss";
import { getAllTemps, TempResponse } from "../../services/temp-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import PersonCard from "../../components/PersonCard/PersonCard";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";

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

  const handlePersonClick = (person: TempResponse) => {
    setSelectedPerson(person);
  }

  const handleClosePerson = () => {
    setSelectedPerson(null);
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

      {selectedPerson && (
        <div className={styles.PopUpSection}>
          <h2>{`${selectedPerson.firstName} ${selectedPerson.lastName}`}</h2>
          <p>Person Details</p>
          <button onClick={handleClosePerson}>Close</button>
        </div>
      )}
    </div>
  )
}

export default PeoplePage;