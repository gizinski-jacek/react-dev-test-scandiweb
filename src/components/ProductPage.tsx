import { gql } from '@apollo/client';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { client } from '..';
import { AppDispatch } from '../app/store';
import { addItem } from '../features/cartSlice';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import { CartProduct, Currency, WithRouter } from '../types/types';
import productToCartProduct from '../utils/productToCartProduct';

const Product = styled.div`
	display: flex;
`;

const Gallery = styled.div``;

const ImageWrapper = styled.div.attrs((props: { inStock: boolean }) => ({
	inStock: props.inStock ? '' : '',
}))`
	max-width: 280px;
	height: 280px;
	position: relative;

	&.out-of-stock {
		img {
			opacity: 0.25;
		}

		:before {
			font-size: 1.5rem;
			white-space: nowrap;
			content: 'Out of Stock';
			text-transform: uppercase;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

const Image = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

const Info = styled.div``;

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
	addItem: (product: CartProduct) => void;
}

class ProductPage extends Component<Props> {
	state: CartProduct = {} as CartProduct;

	componentDidMount = async () => {
		const { id } = this.props.withRouter.params;
		const response = await client.query({
			query: GET_PRODUCT_DETAILS,
			variables: { id: id },
		});
		const cartProduct = productToCartProduct(response.data.product);
		this.setState(cartProduct);
	};

	render() {
		return (
			this.state && (
				<Product>
					<Gallery></Gallery>
					<ImageWrapper>
						<Image></Image>
					</ImageWrapper>
					<Info></Info>
				</Product>
			)
		);
	}
}

const GET_PRODUCT_DETAILS = gql`
	query Product($id: String!) {
		product(id: $id) {
			id
			name
			inStock
			gallery
			description
			category
			attributes {
				id
				name
				type
				items {
					displayValue
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
			brand
		}
	}
`;

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addItem: (product: CartProduct) => dispatch(addItem(product)),
	};
}

export default withRouter(connect(null, mapDispatchToProps)(ProductPage));
