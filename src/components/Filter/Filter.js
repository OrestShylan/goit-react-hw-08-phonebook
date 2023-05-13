import { useDispatch, useSelector } from 'react-redux';
import { filterInStateContacts } from 'redux/phonebook/sliceFilter';
import { selectFilter } from 'redux/phonebook/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const getInput = ({ target: { value } }) => {
    dispatch(filterInStateContacts({ value }));
  };

  return (
    <div className={css.inputWrapper}>
      <label htmlFor="searchInput">Search contacts by name here</label>

      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        id="searchInput"
        name="filter"
        onChange={getInput}
        value={filter}
      />
    </div>
  );
};
