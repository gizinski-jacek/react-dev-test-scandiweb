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
import Image from '../reusables/Image';
import ProductAttributes from '../wrappers/ProductAttributes';

const Product = styled.div`
	display: flex;
`;

const Gallery = styled.div`
	display: flex;
	flex-direction: column;
`;

const Info = styled.div``;

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
	addItem: (product: CartProduct) => void;
}

interface State {
	product: CartProduct | undefined;
	activeImage: string;
}

class ProductPage extends Component<Props> {
	state: State = { product: undefined, activeImage: '' };

	componentDidMount = async () => {
		const { id } = this.props.withRouter.params;
		const response = await client.query({
			query: GET_PRODUCT_DETAILS,
			variables: { id: id },
		});
		const cartProduct = productToCartProduct(response.data.product);
		this.setState({
			...this.state,
			product: cartProduct,
			activeImage: cartProduct.gallery[0],
		});
	};

	changeImage = (index: number) => {
		if (!this.state.product) return;
		this.setState({
			...this.state,
			activeImage: this.state.product?.gallery[index],
		});
	};

	render() {
		return (
			this.state.product && (
				<Product>
					<Gallery>
						{this.state.product.gallery.map((img, i) => (
							<Image
								key={i}
								src={img}
								mWidth={'80px'}
								height={'80px'}
								onClick={() => this.changeImage(i)}
							/>
						))}
					</Gallery>
					<Image
						src={this.state.activeImage}
						mWidth={'280px'}
						height={'280px'}
					/>
					<Info>
						{this.state.product.brand}
						{this.state.product.name}
						<ProductAttributes product={this.state.product} />
						<Button onClick={this.props.addItem}>Add to Cart</Button>
					</Info>
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
