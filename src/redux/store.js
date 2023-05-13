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
  whitelist: ['token'], // дозволяю зберігати у локальному сховищі тільки цей ключ з цілого об'єкту sliceAuth.initialState
};

// ~ Додатковий middleware, щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    // якісь перевірки для серилізації:
    serializableCheck: {
      // якісь екшени, які будуть ігноруватись:
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

// Глобальний стор Redux виношу у окрему змінну:
const storeRedux = configureStore({
  reducer: {
    // storeContacts: persistReducer(contactsPersistConfig, sliceContactsReducer),
    storeAuth: persistReducer(authPersistConfig, sliceAuthReducer),
    storeContacts: sliceContactsReducer,
    storeFilter: sliceFilterReducer,
  },

  // ~ Додатковий middleware, щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
  middleware, // middleware: middleware,
});

// Пов'язую створене Redux-Persist сховище з глобальним Redux стором:
export const persister = persistStore(storeRedux); // Маю передати його до компоненту <PersistGate> у кореневому index.js

export default storeRedux;
