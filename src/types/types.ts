import { ApolloQueryResult } from '@apollo/client';
import { BrowserHistory } from 'history';
import { NavigateFunction, Params } from 'react-router-dom';

export interface Price {
	currency: Currency;
	amount: number;
}

export interface Attribute {
	displayValue?: string;
	value: string;
	id: string;
}

export interface AttributeSet {
	id: string;
	name: string;
	type: string;
	items: Attribute[];
}

export interface Product {
	id: string;
	name: string;
	inStock: boolean;
	gallery: string[];
	description?: string;
	category?: string;
	attributes: AttributeSet[];
	prices: Price[];
	brand: string;
}

export interface Category {
	name: string;
	products?: Product[];
}

export interface Currency {
	label: string;
	symbol: string;
}

export interface CartAttributeSet {
	id: string;
	name: string;
	type: string;
	item: Attribute;
}
export interface CartProduct extends Product {
	count: number;
	selectedAttributes: CartAttributeSet[];
}

export interface CartProductWithUID extends CartProduct {
	uid: string;
}

export interface WithRouter {
	location: Location;
	navigate: NavigateFunction;
	params: Params<string>;
	history: BrowserHistory;
}

export interface GQLInitialData extends ApolloQueryResult<any> {
	data: {
		categories: Category[];
		currencies: Currency[];
		category: { products: Product[] };
	};
}

export interface GQLCategoryData extends ApolloQueryResult<any> {
	data: {
		category: { name: string; products: Product[] };
	};
}

export interface GQLProductData extends ApolloQueryResult<any> {
	data: {
		product: CartProduct;
	};
}
