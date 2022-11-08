import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProductWithUID } from '../types/types';

const initialState: CartProductWithUID[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<CartProductWithUID>) => {
			const sameTypeProductsInCart = state.filter(
				(product) => product.id === action.payload.id
			);
			if (sameTypeProductsInCart.length) {
				const sameAttributesProduct = sameTypeProductsInCart.find((product) => {
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
			} else {
				state.push(action.payload);
			}
		},
		removeProduct: (state, action: PayloadAction<CartProductWithUID>) => {
			const newState = state.filter(
				(product) => product.uid !== action.payload.uid
			);
			return newState;
		},
		incrementProduct: (state, action: PayloadAction<CartProductWithUID>) => {
			const newState = state.map((product) =>
				product.uid === action.payload.uid
					? { ...product, count: product.count + 1 }
					: product
			);
			return newState;
		},
		decrementProduct: (state, action: PayloadAction<CartProductWithUID>) => {
			const productInCart = state.find(
				(product) => product.id === action.payload.id
			);
			if (!productInCart) return state;
			if (productInCart.count === 1) {
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
		changeProductAttribute: (
			state,
			action: PayloadAction<CartProductWithUID>
		) => {
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
