import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sortOption: localStorage.getItem('sortOption') || '',
  },
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      localStorage.setItem('sortOption', action.payload);
    },
  },
});

export const { setSortOption } = filterSlice.actions;
export default filterSlice.reducer;