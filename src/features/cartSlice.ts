import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, Product } from '../types/types';

const initialState: CartProduct[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Product>) => {
			const itemInCart = state.find((item) => item.id === action.payload.id);
			if (itemInCart) {
				const newState = state.map((item) =>
					item.id === action.payload.id
						? { ...item, count: item.count + 1 }
						: item
				);
				return (state = newState);
			} else {
				const newState = [...state, { ...action.payload, count: 1 }];
				return (state = newState);
			}
		},
		removeItem: (state, action: PayloadAction<Product>) => {
			const newState = state.filter(
				(product) => product.id !== action.payload.id
			);
			return (state = newState);
		},
		incrementItem: (state, action: PayloadAction<Product>) => {
			const newState = state.map((item) =>
				item.id === action.payload.id
					? { ...item, count: item.count + 1 }
					: item
			);
			return (state = newState);
		},
		decrementItem: (state, action: PayloadAction<Product>) => {
			const newState = state.map((item) =>
				item.id === action.payload.id
					? { ...item, count: item.count - 1 }
					: item
			);
			return (state = newState);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, incrementItem, decrementItem } =
	cartSlice.actions;

export default cartSlice.reducer;
