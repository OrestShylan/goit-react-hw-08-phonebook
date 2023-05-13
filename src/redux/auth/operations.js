import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const tokenFn = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('users/signup', credentials);

      tokenFn.set(response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Відправляю дані клієнта на бекенд для аутентифікації
      const response = await axios.post('/users/login', credentials);
      // Після запиту бекенд формує pending/fulfilled/rejected

      // ^ два варіанти - через функцію tokenFn і напряму:
      tokenFn.set(response.data.token);
      // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogOut = createAsyncThunk(
  'auth/logout',
  async (token, { rejectWithValue }) => {
    // credentials - об'єкт з властивосями:
    // {
    //   "email": "string",
    //   "password": "string",
    // }
    try {
      // Відправляю дані клієнта на бекенд для аутентифікації
      // Не зрозуміло чи потребен token - працює і без нього, хоча в документації він ніби потрібен
      const response = await axios.post('/users/logout', token);
      // Після запиту бекенд формує pending/fulfilled/rejected

      // ^ два варіанти - через функцію tokenFn і напряму:
      // axios.defaults.headers.common.Authorization = '';
      tokenFn.unset();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// thunkAPI.getState() - повертає весь Redux-стан повністю
export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const receivedToken = state.storeAuth.token;

    if (receivedToken === null) {
      return rejectWithValue(
        'Нема токена - нема юзера. На все добре, до побачення'
      );
    }

    try {
      tokenFn.set(receivedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
