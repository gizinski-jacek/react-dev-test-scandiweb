import { gql } from '@apollo/client';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { client } from '..';
import { AppDispatch } from '../app/store';
import { addItem, changeItemAttribute } from '../features/cartSlice';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import {
	Attribute,
	AttributeSet,
	CartProduct,
	Currency,
	WithRouter,
} from '../types/types';
import productToCartProduct from '../utils/productToCartProduct';
import Image from '../reusables/Image';
import ProductAttributes from '../wrappers/ProductAttributes';

const Product = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const Gallery = styled.div`
	display: flex;

	> div {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1rem;
		max-height: 600px;
		margin-right: 1rem;
	}
`;

const Info = styled.div`
	> * {
		margin: 1rem;
	}

	span {
		display: block;
		font-weight: 600;
	}
`;

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
	addItem: (product: CartProduct) => void;
	changeItemAttribute: (product: CartProduct) => void;
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

	changeAttribute = (
		e: React.MouseEvent<HTMLDivElement>,
		attribute: AttributeSet,
		attributeItem: Attribute
	) => {
		e.stopPropagation();
		if (!this.state.product) return;
		const updatedAttribute = this.state.product.selectedAttributes.map((att) =>
			att.id === attribute.id ? { ...attribute, item: attributeItem } : att
		);
		const updatedItem = {
			...this.state.product,
			selectedAttributes: updatedAttribute,
		};
		this.setState({ ...this.state, product: updatedItem });
	};

	addToCart = () => {
		if (!this.state.product) return;
		this.props.addItem(this.state.product);
	};

	render() {
		const itemPrice = this.state.product?.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return (
			this.state.product && (
				<Product>
					<Gallery>
						<div>
							{this.state.product.gallery.map((img, i) => (
								<Image
									key={i}
									src={img}
									width={'60px'}
									height={'60px'}
									cursor={'true'}
									onClick={() => this.changeImage(i)}
								/>
							))}
						</div>
						<Image
							src={this.state.activeImage}
							width={'600px'}
							height={'600px'}
						/>
					</Gallery>
					<Info>
						<h4 style={{ fontWeight: '600' }}>{this.state.product.brand}</h4>
						<h4>{this.state.product.name}</h4>
						<ProductAttributes
							product={this.state.product}
							onClick={this.changeAttribute}
						/>
						<span>Price:</span>
						<h4 style={{ fontWeight: '600' }}>
							{itemPrice?.currency.symbol}
							{itemPrice?.amount}
						</h4>
						<Button
							disabled={!this.state.product.inStock}
							onClick={this.addToCart}
						>
							Add to Cart
						</Button>
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
		changeItemAttribute: (product: CartProduct) =>
			dispatch(changeItemAttribute(product)),
	};
}

export default withRouter(connect(null, mapDispatchToProps)(ProductPage));
