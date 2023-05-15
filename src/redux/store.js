import { configureStore } from '@reduxjs/toolkit';

import sliceFilterReducer from './phonebook/sliceFilter';
import sliceContactsReducer from './phonebook/slice';
import sliceAuthReducer from './auth/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

const storeRedux = configureStore({
  reducer: {
    storeAuth: persistReducer(authPersistConfig, sliceAuthReducer),
    storeContacts: sliceContactsReducer,
    storeFilter: sliceFilterReducer,
  },

  middleware,
});

export const persister = persistStore(storeRedux);

export default storeRedux;
