import { useState } from "react";
import styles from "./PeoplePage.module.scss";
import { TempResponse } from "../../services/temp-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import PersonCard from "../../components/PersonCard/PersonCard";

const PeoplePage = () => {
  const tempPeople = [
    {id: 1, firstName: "John", lastName: "Smith"},
    {id: 2, firstName: "Jane", lastName: "Doe"},
    {id: 3, firstName: "Sarah", lastName: "Jones"},
  ]

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
          {tempPeople.map((person) => 
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