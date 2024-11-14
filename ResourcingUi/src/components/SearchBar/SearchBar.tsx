import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    onTermSearch: (searchTerm: string | null) => void;
}

const SearchBar = ({ onTermSearch } : SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onTermSearch(searchTerm);
    setSearchTerm(null);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.SearchBar}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm || ""}
        onChange={handleSearchTermChange}
        required
      />

      <button className={styles.SearchButton}>
        Search
      </button>
    </form>
  )
}

export default SearchBar