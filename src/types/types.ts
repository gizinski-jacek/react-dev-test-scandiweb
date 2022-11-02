export interface Price {
	currency: Currency;
	amount: number;
}

export interface Attribute {
	displayValue: string;
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
	description: string;
	category: string;
	attributes: AttributeSet[];
	prices: Price[];
	brand: string;
}

export interface Category {
	name: string;
	products: Product[];
}

export interface Currency {
	label: string;
	symbol: string;
}

export interface CartProduct extends Product {
	count: number;
}
