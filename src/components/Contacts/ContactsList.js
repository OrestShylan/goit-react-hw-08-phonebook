import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/phonebook/operations';

export function ContactsList({ name, number, id }) {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(promise => {
        Notiflix.Notify.success(`Contact "${promise.name}" has been deleted`);
      })
      .catch(error => {
        Notiflix.Notify.failure(`Some error: "${error}"`);
      });
  };

  return (
    <li>
      {name}: {number}
      <button className="btn btn-outline-primary" onClick={handleDeleteContact}>
        Delete
      </button>
    </li>
  );
}

ContactsList.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
