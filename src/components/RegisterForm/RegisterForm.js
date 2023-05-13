import css from './RegisterForm.module.css';
import Notiflix from 'notiflix';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegister } from 'redux/auth/operations';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!userName || !userEmail || !userPassword) {
      Notiflix.Notify.failure(`Всі поля мають бути заповнені`);
      return;
    }

    dispatch(
      fetchRegister({
        name: userName,
        email: userEmail,
        password: userPassword,
      })
    )
      .unwrap()
      .then(promise => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');

        Notiflix.Notify.success(
          `Користувач ${promise.user.name} успішно зареєстрований`
        );
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Помилка: ${error}. Можливо такий користувач вже існує.`
        );
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" onChange={getInput} value={userName} />
      </label>
      <label className={css.label}>
        Email
        <input
          type="email"
          name="email"
          onChange={getInput}
          value={userEmail}
        />
      </label>
      <label className={css.label}>
        Password
        <input
          type="password"
          name="password"
          onChange={getInput}
          value={userPassword}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};
