import css from './Contacts.module.css';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/phonebook/selectors';

import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Contacts } from 'components/Contacts/Contacts';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/phonebook/operations';

const ContactsPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contactsList = useSelector(selectContacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={css.contactsContainer}>
        <div className={css.contactsItem}>
          <h2>Phonebook</h2>
          <ContactForm />
        </div>
        {contactsList.length > 0 && (
          <div>
            <div className={css.contactsItem}>
              <h2>Contacts</h2>
              <Filter />
            </div>
            <div className={css.contactsItem}>
              <div className={css.contactsPreloader}>
                <p>List of contacts</p>
                <div className={css.preloader}>
                  {isLoading && !error && <></>}
                </div>
              </div>
              <Contacts />
              {error && <h2>Error: {error}</h2>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactsPage;
