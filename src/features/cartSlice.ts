import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/types';

const initialState: CartProduct[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartProduct>) => {
			const itemInCart = state.find((item) => item.id === action.payload.id);
			const sameAttributes = itemInCart?.selectedAttributes.map(
				(attribute) =>
					action.payload.selectedAttributes.find(
						(att) => att.id === attribute.id
					)?.item.id === attribute.item.id
			);
			if (itemInCart && sameAttributes?.every((v) => v)) {
				itemInCart.count++;
				const newState = state.map((item) =>
					item.uid === itemInCart.uid ? itemInCart : item
				);
				return (state = newState);
			} else {
				state = [...state, action.payload];
			}
		},
		removeItem: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.filter(
				(product) => product.uid !== action.payload.uid
			);
			return (state = newState);
		},
		incrementItem: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((item) =>
				item.uid === action.payload.uid
					? { ...item, count: item.count + 1 }
					: item
			);
			return (state = newState);
		},
		decrementItem: (state, action: PayloadAction<CartProduct>) => {
			const itemInCart = state.find((item) => item.id === action.payload.id);
			if (itemInCart?.count === 1) {
				const newState = state.filter(
					(product) => product.uid !== action.payload.uid
				);
				return (state = newState);
			} else {
				const newState = state.map((item) =>
					item.uid === action.payload.uid
						? { ...item, count: item.count - 1 }
						: item
				);
				return (state = newState);
			}
		},
		changeItemAttribute: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((item) =>
				item.uid === action.payload.uid ? action.payload : item
			);
			return (state = newState);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addItem,
	removeItem,
	incrementItem,
	decrementItem,
	changeItemAttribute,
} = cartSlice.actions;

export default cartSlice.reducer;
