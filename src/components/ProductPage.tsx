import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../redux/store';
import { addProduct } from '../redux-slices/cartSlice';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import {
	Attribute,
	AttributeSet,
	CartProduct,
	CartProductWithUID,
	Currency,
	GQLProductData,
	WithRouter,
} from '../types/types';
import productToCartProduct from '../utils/productToCartProduct';
import Image from '../reusables/Image';
import ProductAttributes from '../wrappers/ProductAttributes';
import { GET_PRODUCT_DETAILS } from '../apollo/queries';
import { client } from '../apollo/client';
import parse from 'html-react-parser';

const Product = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	gap: 2rem;

	@media only screen and (min-width: 768px) {
		flex-direction: row;
	}
`;

const Gallery = styled.div`
	display: flex;
	gap: 2rem;
	max-height: 420px;
	width: fit-content;
`;

const Thumbnails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	overflow-y: scroll;
	padding-left: 1rem;
	direction: rtl;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 240px;

	span {
		display: block;
		font-weight: 600;
	}
`;

const Name = styled.div`
	h4 {
		margin: 0;
		margin-bottom: 0.5rem;

		&:first-child {
			font-weight: 600;
		}
	}
`;

const Price = styled.div`
	font-weight: 600;
`;

const H2 = styled.h2`
	text-align: center;
	margin: 5rem 0;
`;

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
	addProduct: (product: CartProductWithUID | CartProduct) => void;
}

interface State {
	product: CartProduct | null;
	activeImage: string;
}

class ProductPage extends Component<Props> {
	state: State = { product: null, activeImage: '' };

	componentDidMount = async () => {
		try {
			const { id } = this.props.withRouter.params;
			const response: GQLProductData = await client.query({
				query: GET_PRODUCT_DETAILS,
				variables: { id: id },
			});
			if (!response.data.product) {
				this.setState({
					...this.state,
					product: null,
				});
			} else {
				const cartProduct = productToCartProduct(response.data.product);
				this.setState({
					...this.state,
					product: cartProduct,
					activeImage: cartProduct.gallery[0],
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	changeImage = (index: number) => {
		if (!this.state.product) return;
		this.setState({
			...this.state,
			activeImage: this.state.product?.gallery[index],
		});
	};

	changeAttribute = (
		attribute: AttributeSet,
		attributeItem: Attribute,
		product: CartProduct
	) => {
		if (!this.state.product) return;
		const { items, ...otherKeys } = attribute;
		const updatedAttribute = this.state.product.selectedAttributes.map((att) =>
			att.id === attribute.id ? { ...otherKeys, item: attributeItem } : att
		);
		const updatedProduct = {
			...this.state.product,
			selectedAttributes: updatedAttribute,
		};
		this.setState({ ...this.state, product: updatedProduct });
	};

	addToCart = () => {
		if (!this.state.product) return;
		this.props.addProduct(this.state.product);
	};

	render() {
		const productPrice = this.state.product?.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return this.state.product ? (
			<Product>
				<Gallery>
					<Thumbnails>
						{this.state.product.gallery.map((img, i) => (
							<Image
								key={img}
								src={img}
								width={'80px'}
								height={'80px'}
								cursor={'true'}
								onClick={() => this.changeImage(i)}
							/>
						))}
					</Thumbnails>
					<Image
						src={this.state.activeImage}
						width={'420px'}
						height={'420px'}
					/>
				</Gallery>
				<Info>
					<Name>
						<h4>{this.state.product.brand}</h4>
						<h4>{this.state.product.name}</h4>
					</Name>
					<ProductAttributes
						product={this.state.product}
						onClick={this.changeAttribute}
						bigger
					/>
					<Price>
						<span>Price:</span>
						<h4>
							{productPrice?.currency.symbol}
							{productPrice?.amount}
						</h4>
					</Price>
					<Button
						bgColor='#00c800'
						disabled={!this.state.product.inStock}
						onClick={this.addToCart}
					>
						{this.state.product.inStock ? 'Add to Cart' : 'Out of Stock'}
					</Button>
					{this.state.product.description &&
						parse(this.state.product.description)}
				</Info>
			</Product>
		) : (
			<H2>Product not found</H2>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addProduct: (product: CartProductWithUID | CartProduct) =>
			dispatch(addProduct(product)),
	};
}

export default withRouter(connect(null, mapDispatchToProps)(ProductPage));
