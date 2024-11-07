import { useContext, useEffect, useState } from "react";
import styles from "./PeoplePage.module.scss";
import { createTemp, getAllTemps, TempResponse } from "../../services/temp-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import PersonCard from "../../components/PersonCard/PersonCard";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import { TempFormData } from "../../components/TempForm/schema";
import TempForm from "../../components/TempForm/TempForm";

const filterOption = {
  FIRSTNAME: 'First Name',
  LASTNAME: 'Last Name'
}

type filterOptionType = typeof filterOption[keyof typeof filterOption];

const PeoplePage = () => {
  const tempsContext = useContext(TempsContext);
  if (tempsContext === undefined) {
    throw new Error("Something went wrong");
  }
  const { temps, setTemps } = tempsContext;

  const [selectedFilter, setSelectedFilter] = useState<filterOptionType>(filterOption.FIRSTNAME);

  useEffect(() => {
    getAllTemps()
      .then((data) => {
        const orderedData = data.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
        setTemps(orderedData);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    const sortedTemps = [...temps];
    if (selectedFilter === filterOption.LASTNAME) {
      sortedTemps.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()));
    } else {
      sortedTemps.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
    }

    setTemps(sortedTemps);
  }, [selectedFilter]);

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className={styles.PeoplePage}>
      <div className={styles.MainSection}>
        <h2>People</h2>
        <p>Search Bar</p>
        
        <div className={styles.Filter}>
          <label htmlFor="filterBy">Filter by:</label>
          <select
            id="filterBy"
            value={selectedFilter}
            onChange={handleFilterChange}
            className={styles.FilterDropdown}
          >
            <option value={filterOption.FIRSTNAME}>{filterOption.FIRSTNAME}</option>
            <option value={filterOption.LASTNAME}>{filterOption.LASTNAME}</option>
          </select>
        </div>

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