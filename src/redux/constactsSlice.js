import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { addContact } from './operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    deleteContact(state, action) {
      console.log(action.payload);
      return state.items.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
      console.log('pending');
    },
    [fetchContacts.fulfilled](state, action) {
      state.items = action.payload;
      state.isLoading = false;
      console.log('fulfilled');
    },
    [fetchContacts.rejected](state) {
      state.isLoading = false;
      console.log('rejected');
    },
    [addContact.pending](state) {
      state.isLoading = true;
      console.log('pending');
    },
    [addContact.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
      console.log('fulfilled');
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      console.log(action.payload.error);
    },
  },
});

export const { deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
