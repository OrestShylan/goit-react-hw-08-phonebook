import css from './Contacts.module.css';
import { useSelector } from 'react-redux';
import { ContactsList } from './ContactsList';

import { selectContacts, selectFilter } from 'redux/phonebook/selectors';

export const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = filter
    ? contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    filteredContacts.length > 0 && (
      <ul className={css.list}>
        {filteredContacts.map(({ name, number, id }) => {
          return (
            <ContactsList
              key={id}
              name={name}
              number={number}
              id={id}
            ></ContactsList>
          );
        })}
      </ul>
    )
  );
};
