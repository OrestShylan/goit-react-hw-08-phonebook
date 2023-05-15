import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/phonebook/selectors';
import { addContact } from 'redux/phonebook/operations';
import css from './ContactFrom.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else {
      setUserNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isExist = contacts.find(contact => contact.name === userName);

    if (isExist) {
      Notiflix.Notify.warning(`User "${userName}" is already in contacts`);
      return;
    } else {
      const isCreated = dispatch(
        addContact({ name: userName, number: userNumber })
      );

      if (isCreated) {
        Notiflix.Notify.success(`Contact "${userName}" added successfully!`);
        setUserName('');
        setUserNumber('');
      }
    }
  };

  return (
    <form className={css.userFormWrapper} onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <label htmlFor="UserName" className={css.formLabel}>
          Name
        </label>

        <input
          className="form-control me-2"
          placeholder="Enter contact name here"
          aria-label="User Name"
          id="UserId"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={getInput}
          value={userName}
        />
      </div>

      <div className={css.inputWrapper}>
        <label htmlFor="UserNumber">Phone Number</label>
        <input
          className="form-control me-2"
          placeholder="Enter contact phone number here"
          aria-label="Phone number"
          id="number"
          onChange={getInput}
          value={userNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button className="btn btn-outline-primary" type="submit">
        Add contact
      </button>
    </form>
  );
};
