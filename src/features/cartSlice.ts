import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/types';

const initialState: CartProduct[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartProduct>) => {
			const sameTypeItemsInCart = state.filter(
				(item) => item.id === action.payload.id
			);
			const sameAttributesItem = sameTypeItemsInCart?.find((item) => {
				const sameAttributes = item.selectedAttributes.map(
					(attribute) =>
						action.payload.selectedAttributes.find(
							(att) => att.id === attribute.id
						)?.item.id === attribute.item.id
				);
				if (sameAttributes.every((v) => v)) {
					return item;
				}
			});
			if (sameAttributesItem) {
				const index = state.findIndex(
					(item) => item.uid === sameAttributesItem.uid
				);
				state[index].count++;
			} else {
				state.push(action.payload);
			}
		},
		removeItem: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.filter(
				(product) => product.uid !== action.payload.uid
			);
			return newState;
		},
		incrementItem: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((item) =>
				item.uid === action.payload.uid
					? { ...item, count: item.count + 1 }
					: item
			);
			return newState;
		},
		decrementItem: (state, action: PayloadAction<CartProduct>) => {
			const itemInCart = state.find((item) => item.id === action.payload.id);
			if (itemInCart?.count === 1) {
				const newState = state.filter(
					(product) => product.uid !== action.payload.uid
				);
				return newState;
			} else {
				const newState = state.map((item) =>
					item.uid === action.payload.uid
						? { ...item, count: item.count - 1 }
						: item
				);
				return newState;
			}
		},
		changeItemAttribute: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((item) =>
				item.uid === action.payload.uid ? action.payload : item
			);
			return newState;
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
