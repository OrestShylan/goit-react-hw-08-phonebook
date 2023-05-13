import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogIn } from 'redux/auth/operations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const getInput = ({ target: { name, value } }) => {
    if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      Notiflix.Notify.failure(`Всі поля мають бути заповнені`);
      return;
    }

    dispatch(
      fetchLogIn({
        email: userEmail,
        password: userPassword,
      })
    )
      .unwrap()
      .then(promise => {
        Notiflix.Notify.success(`Ласкаво просимо, ${promise.user.name}.`);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Помилка: ${error}. Можливо не правильний логін чи пароль.`
        );
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
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
      <button type="submit">Log In</button>
    </form>
  );
};
