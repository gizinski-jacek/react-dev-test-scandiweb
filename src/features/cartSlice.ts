import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/types';

const initialState: CartProduct[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<CartProduct>) => {
			const sameTypeProductsInCart = state.filter(
				(product) => product.id === action.payload.id
			);
			const sameAttributesProduct = sameTypeProductsInCart?.find((product) => {
				const sameAttributes = product.selectedAttributes.map(
					(attribute) =>
						action.payload.selectedAttributes.find(
							(att) => att.id === attribute.id
						)?.item.id === attribute.item.id
				);
				if (sameAttributes.every((v) => v)) {
					return product;
				} else return null;
			});
			if (sameAttributesProduct) {
				const index = state.findIndex(
					(product) => product.uid === sameAttributesProduct.uid
				);
				state[index].count++;
			} else {
				state.push(action.payload);
			}
		},
		removeProduct: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.filter(
				(product) => product.uid !== action.payload.uid
			);
			return newState;
		},
		incrementProduct: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((product) =>
				product.uid === action.payload.uid
					? { ...product, count: product.count + 1 }
					: product
			);
			return newState;
		},
		decrementProduct: (state, action: PayloadAction<CartProduct>) => {
			const productInCart = state.find(
				(product) => product.id === action.payload.id
			);
			if (productInCart?.count === 1) {
				const newState = state.filter(
					(product) => product.uid !== action.payload.uid
				);
				return newState;
			} else {
				const newState = state.map((product) =>
					product.uid === action.payload.uid
						? { ...product, count: product.count - 1 }
						: product
				);
				return newState;
			}
		},
		changeProductAttribute: (state, action: PayloadAction<CartProduct>) => {
			const newState = state.map((product) =>
				product.uid === action.payload.uid ? action.payload : product
			);
			return newState;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addProduct,
	removeProduct,
	incrementProduct,
	decrementProduct,
	changeProductAttribute,
} = cartSlice.actions;

export default cartSlice.reducer;
