import { TempResponse } from "../../services/temp-services";
import styles from "./PersonCard.module.scss";

interface PersonCardProps {
    person: TempResponse;
    onClick: (person: TempResponse) => void;
}

const PersonCard = ({ person, onClick }: PersonCardProps) => {
  return (
    <li 
      className={styles.PersonCard}
      onClick={() => onClick(person)}
    >
        <p>{`${person.firstName} ${person.lastName}`}</p>
    </li>
  )
}

export default PersonCard;