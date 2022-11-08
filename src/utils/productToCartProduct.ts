import { CartProduct, Product } from '../types/types';

// Transform Product object to CartProduct with uid, default count of 1,
// and default attributes to the first one in "items" array.
const productToCartProduct = (product: Product): CartProduct => {
	const defaultAttributes = product.attributes.map((att) => {
		return {
			id: att.id,
			name: att.name,
			item: att.items[0],
		};
	});
	const item: CartProduct = {
		...product,
		count: 1,
		selectedAttributes: defaultAttributes,
	};
	return item;
};

export default productToCartProduct;
