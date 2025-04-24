import { createSlice } from '@reduxjs/toolkit';
import { initialCryptoData } from '../data/mockData';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: initialCryptoData,
  },
  reducers: {
    updateAsset: (state, action) => {
      const { id, updatedData } = action.payload;
      const assetIndex = state.assets.findIndex((asset) => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex] = { ...state.assets[assetIndex], ...updatedData };
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export const selectCryptoAssets = (state) => state.crypto.assets;

export default cryptoSlice.reducer;