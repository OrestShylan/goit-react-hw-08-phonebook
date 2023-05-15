import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectUserToken } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';
import { fetchLogOut } from 'redux/auth/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const name = useSelector(selectUserName);

  return (
    <>
      <div className={css.userMenuContainer}>
        <p>Welcome, {name}</p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => dispatch(fetchLogOut(token))}
        >
          Logout
        </button>
      </div>
    </>
  );
};
