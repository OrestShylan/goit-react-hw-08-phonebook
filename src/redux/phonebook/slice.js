import { fetchContacts, addContact, deleteContact } from './operations';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

const initialState = {
  stateContacts: [],
  isLoading: false,
  error: null,
};

// * Для скорочення коду extraReducers:
// & Однакові загальні методи для всіх pending і всіх rejected
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// & під кожен fullFilled своя функція:
const fetchHandleFulfilled = (state, action) => {
  state.stateContacts = action.payload;
};

const addHandleFulfilled = (state, action) => {
  state.stateContacts.push(action.payload);
};

const deleteHandleFulfilled = (state, action) => {
  // state.isLoading = false;
  // state.error = null;
  const index = state.stateContacts.findIndex(
    contact => contact.id === action.payload.id
  );
  state.stateContacts.splice(index, 1);
};

// & Додаткове скорочення коду у всіх fulFilled:
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const namesArr = [fetchContacts, addContact, deleteContact];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceContacts = createSlice({
  name: 'fetchContacts',
  initialState,

  // ~ Новий метод: 'builder callback' notation
  extraReducers: builder => {
    builder
      // & Варіант 1 з addCase
      // .addCase(fetchContacts.pending, handlePending) // переніс у isAnyOf
      .addCase(fetchContacts.fulfilled, fetchHandleFulfilled)
      // .addCase(fetchContacts.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(addContact.pending, handlePending) // переніс у isAnyOf
      .addCase(addContact.fulfilled, addHandleFulfilled)
      // .addCase(addContact.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(deleteContact.pending, handlePending) // переніс у isAnyOf
      .addCase(deleteContact.fulfilled, deleteHandleFulfilled)

      .addMatcher(isAnyOf(...addStatusToName(PENDING)), handlePending)
      .addMatcher(isAnyOf(...addStatusToName(REJECTED)), handleRejected)
      // Ще одне поращення для скорочення коду:
      .addMatcher(isAnyOf(...addStatusToName(FULFILLED)), handleFulfilled);
  },
});

export default sliceContacts.reducer;
