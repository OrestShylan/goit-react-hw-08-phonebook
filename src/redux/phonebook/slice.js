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

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchHandleFulfilled = (state, action) => {
  state.stateContacts = action.payload;
};

const addHandleFulfilled = (state, action) => {
  state.stateContacts.push(action.payload);
};

const deleteHandleFulfilled = (state, action) => {
  const index = state.stateContacts.findIndex(
    contact => contact.id === action.payload.id
  );
  state.stateContacts.splice(index, 1);
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const namesArr = [fetchContacts, addContact, deleteContact];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceContacts = createSlice({
  name: 'fetchContacts',
  initialState,

  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, fetchHandleFulfilled)

      .addCase(addContact.fulfilled, addHandleFulfilled)

      .addCase(deleteContact.fulfilled, deleteHandleFulfilled)

      .addMatcher(isAnyOf(...addStatusToName(PENDING)), handlePending)
      .addMatcher(isAnyOf(...addStatusToName(REJECTED)), handleRejected)

      .addMatcher(isAnyOf(...addStatusToName(FULFILLED)), handleFulfilled);
  },
});

export default sliceContacts.reducer;
