import {
  fetchLogIn,
  fetchLogOut,
  fetchRegister,
  fetchCurrentUser,
} from './operations';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

const initialState = {
  user: { name: null, email: null },
  token: null,

  isRefreshing: false,
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

const authHandleFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
};

const logOutHandleFulfilled = state => {
  state.user = { name: null, email: null };
  state.token = null;
};

const refreshHandlePending = (state, action) => {
  state.isRefreshing = true;
};
const refreshHandleFulfilled = (state, action) => {
  state.user = action.payload;
  state.isRefreshing = false;
};
const refreshHandleRejected = (state, action) => {
  state.isRefreshing = false;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const namesArr = [fetchRegister, fetchLogIn, fetchLogOut];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceAuth = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchRegister.fulfilled, authHandleFulfilled)
      .addCase(fetchLogIn.fulfilled, authHandleFulfilled)
      .addCase(fetchLogOut.fulfilled, logOutHandleFulfilled)

      .addCase(fetchCurrentUser.pending, refreshHandlePending)
      .addCase(fetchCurrentUser.fulfilled, refreshHandleFulfilled)
      .addCase(fetchCurrentUser.rejected, refreshHandleRejected)

      .addMatcher(isAnyOf(...addStatusToName(PENDING)), handlePending)
      .addMatcher(isAnyOf(...addStatusToName(REJECTED)), handleRejected)

      .addMatcher(isAnyOf(...addStatusToName(FULFILLED)), handleFulfilled);
  },
});

export default sliceAuth.reducer;
