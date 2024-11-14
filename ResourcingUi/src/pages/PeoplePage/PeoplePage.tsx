import { useContext, useEffect, useState } from "react";
import styles from "./PeoplePage.module.scss";
import { createTemp, getAllTemps, TempResponse, updateTempById } from "../../services/temp-services";
import ListWrapper from "../../wrappers/ListWrapper/ListWrapper";
import PersonCard from "../../components/PersonCard/PersonCard";
import { TempsContext } from "../../contexts/TempsContextProvider/TempsContextProvider";
import { TempFormData } from "../../components/TempForm/tempSchema";
import TempForm from "../../components/TempForm/TempForm";
import { sortTemps } from "../../services/temp-format";

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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<TempResponse | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<filterOptionType>(filterOption.FIRSTNAME);
  const [isCreateTempBtnVisible, setIsCreateTempBtnVisible] = useState<boolean>(true);
  const [isCreateTempFormOpen, setIsCreateTempFormOpen] = useState<boolean>(false);
  const [isEditTempFormOpen, setIsEditTempFormOpen] = useState<boolean>(false);
  const [isTickVisible, setIsTickVisible] = useState<boolean>(false);

  const filteredTemps = temps.filter(
    (temp) =>
    temp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

  const handlePersonClick = (person: TempResponse) => {
    setSelectedPerson(person);
    setIsCreateTempBtnVisible(false);
  }

  const handleClosePerson = () => {
    setSelectedPerson(null);
    setIsCreateTempBtnVisible(true);
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleCreateTempBtnClick = () => {
    setIsCreateTempFormOpen(true);
    setIsCreateTempBtnVisible(false);
  }

  const handleCloseCreateTempForm = () => {
    setIsCreateTempFormOpen(false);
    setIsCreateTempBtnVisible(true);
  }

  const handleEditTempBtnClick = () => {
    setIsEditTempFormOpen(true);
    setIsCreateTempBtnVisible(false);
  }

  const handleCloseEditTempForm = () => {
    setIsEditTempFormOpen(false);
    setIsCreateTempBtnVisible(true);
  }
    
  const onCreateSubmit = async (data: TempFormData) => {
    createTemp(data)
      .then((temp) => {
        const updatedTemps = [...temps, temp];
        const sortedUpdatedTemps = sortTemps(updatedTemps, selectedFilter);
        setTemps(sortedUpdatedTemps);
        setIsCreateTempFormOpen(false);
        setIsTickVisible(true);

        setTimeout(() => {
          setIsTickVisible(false);
          setIsCreateTempFormOpen(false);
          setIsCreateTempBtnVisible(true);
        }, 2000);
        console.log(temp);
      })
      .catch((e) => console.log(e));
  }

  const onEditSubmit = async (id: number, data: TempFormData) => {
    updateTempById(id, data)
      .then(() => {
          const updatedTemps = temps.map((temp) => temp.id === id ? { ...temp, ...data } : temp);
          const sortedUpdatedTemps = sortTemps(updatedTemps, selectedFilter);
          setTemps(sortedUpdatedTemps);
          setIsEditTempFormOpen(false);
          setIsTickVisible(true);
          setSelectedPerson(null);

          setTimeout(() => {
            setIsTickVisible(false);
            setIsCreateTempFormOpen(false);
            setIsCreateTempBtnVisible(true);
          }, 2000);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAllTemps()
      .then((data) => {
        const orderedData = sortTemps(data, selectedFilter);
        setTemps(orderedData);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    const sortedTemps = [...temps];
    setTemps(sortTemps(sortedTemps, selectedFilter));
  }, [selectedFilter]);

  return (
    <div className={styles.PeoplePage}>
      <div className={styles.MainSection}>
        <h2>People</h2>
        <input
          className={styles.SearchBar}
          type="text"
          id="search"
          placeholder="Search for people..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
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
          {filteredTemps.map((person) => 
            <PersonCard key={person.id} person={person} onClick={handlePersonClick}/>
          )}
        </ListWrapper>
      </div>

      {selectedPerson ? (
        <div className={styles.TempPopUp}>
          {isEditTempFormOpen ? ( 
            <div className={styles.CreateTempFormPopUp}>
              <h3>Edit Temp</h3>

              <TempForm 
                formType="EDIT"
                defaultValues={selectedPerson}
                onSubmit={(data) => onEditSubmit(selectedPerson.id, data)}
              />

              <button
                className={styles.Button}
                onClick={handleCloseEditTempForm}
              >
                Close
              </button>
            </div>
          ) : (
            <div className={styles.TempInfo}>
              <h2>{selectedPerson.firstName} {selectedPerson.lastName}</h2>
              <button 
                className={styles.Button}
                onClick={handleEditTempBtnClick}
              >
                Edit
              </button>
              <button 
                className={styles.Button}
                onClick={handleClosePerson}
              >
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.CreateTempContainer}>
          {isCreateTempFormOpen && ( 
            <div className={styles.CreateTempFormPopUp}>
              <h3>Create New Person</h3>

              <TempForm onSubmit={onCreateSubmit}/>

              <button
              className={styles.Button}
                onClick={handleCloseCreateTempForm}
              >
                Close
              </button>
            </div>
          )}

          {isTickVisible && !isCreateTempBtnVisible && (
            <div className={styles.SubmissionContainer}>
              <div className={styles.TickAnimation}>
                <span>✔</span>
              </div>
              <p>Done!</p>
            </div>
          )}

          {isCreateTempBtnVisible && !isTickVisible && (
            <button className={styles.Button} onClick={handleCreateTempBtnClick}>
              Create Person
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PeoplePage;