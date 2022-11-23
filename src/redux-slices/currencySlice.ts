import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../types/types';

const initialState: Currency | any = null;

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		changeCurrency: (state, action: PayloadAction<Currency | null>) => {
			return action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
