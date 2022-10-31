import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

const initialState: { product: Product; count: number }[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			if (action.payload.type === 'add') {
				const newItem = { product: action.payload.product, count: 1 };
				state = [...state, newItem];
			}
		},
		removeItem: (
			state,
			action: PayloadAction<{ type: string; product: Product }>
		) => {
			if (action.payload.type === 'remove') {
				const newState = state.filter(
					(item) => item.product.id !== action.payload.product.id
				);
				state = newState;
			}
		},
		incrementItem: (
			state,
			action: PayloadAction<{ type: string; product: Product }>
		) => {
			if (action.payload.type === 'increment') {
				const newState = state.map((item) =>
					item.product.id === action.payload.product.id
						? { ...item, count: item.count++ }
						: item
				);
				state = newState;
			}
		},
		decrementItem: (
			state,
			action: PayloadAction<{ type: string; product: Product }>
		) => {
			if (action.payload.type === 'decrement') {
				const newState = state.map((item) =>
					item.product.id === action.payload.product.id
						? { ...item, count: item.count-- }
						: item
				);
				state = newState;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, incrementItem, decrementItem } =
	cartSlice.actions;

export default cartSlice.reducer;
