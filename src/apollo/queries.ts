import { gql } from '@apollo/client';

export const GET_LISTS = gql`
	query {
		categories {
			name
		}
		currencies {
			label
			symbol
		}
	}
`;

export const GET_CATEGORY_PRODUCTS = gql`
	query ($category: String!) {
		category(input: { title: $category }) {
			name
			products {
				id
				name
				brand
				inStock
				gallery
				attributes {
					id
					name
					type
					items {
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

export const GET_PRODUCT_DETAILS = gql`
	query Product($id: String!) {
		product(id: $id) {
			id
			name
			brand
			inStock
			gallery
			description
			attributes {
				id
				name
				type
				items {
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
		}
	}
`;
