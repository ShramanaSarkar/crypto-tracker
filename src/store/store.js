import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    filter: filterReducer,
  },
});