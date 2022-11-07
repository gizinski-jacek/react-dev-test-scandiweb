import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { addProduct } from '../features/cartSlice';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import {
	Attribute,
	AttributeSet,
	CartProduct,
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
	justify-content: space-evenly;
	gap: 2rem;
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
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 280px;

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

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
	addProduct: (product: CartProduct) => void;
}

interface State {
	product: CartProduct | undefined;
	activeImage: string;
}

class ProductPage extends Component<Props> {
	state: State = { product: undefined, activeImage: '' };

	componentDidMount = async () => {
		try {
			const { id } = this.props.withRouter.params;
			const response: GQLProductData = await client.query({
				query: GET_PRODUCT_DETAILS,
				variables: { id: id },
			});
			const cartProduct = productToCartProduct(response.data.product);
			this.setState({
				...this.state,
				product: cartProduct,
				activeImage: cartProduct.gallery[0],
			});
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
		e: React.MouseEvent<HTMLDivElement>,
		attribute: AttributeSet,
		attributeItem: Attribute
	) => {
		e.stopPropagation();
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
							maxWidth={'600px'}
							height={'600px'}
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
						/>
						<Price>
							<span>Price:</span>
							<h4>
								{productPrice?.currency.symbol}
								{productPrice?.amount}
							</h4>
						</Price>
						<Button
							disabled={!this.state.product.inStock}
							onClick={this.addToCart}
						>
							{this.state.product.inStock ? 'Add to Cart' : 'Out of Stock'}
						</Button>
						{this.state.product.description &&
							parse(this.state.product.description)}
					</Info>
				</Product>
			)
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addProduct: (product: CartProduct) => dispatch(addProduct(product)),
	};
}

export default withRouter(connect(null, mapDispatchToProps)(ProductPage));
