import { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from '../styled/ProductPage.styled';
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
			<styled.Product>
				<styled.Gallery>
					<styled.Thumbnails>
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
					</styled.Thumbnails>
					<Image
						src={this.state.activeImage}
						width={'420px'}
						height={'420px'}
					/>
				</styled.Gallery>
				<styled.Info>
					<styled.Name>
						<h4>{this.state.product.brand}</h4>
						<h4>{this.state.product.name}</h4>
					</styled.Name>
					<ProductAttributes
						product={this.state.product}
						onClick={this.changeAttribute}
						bigger
					/>
					<styled.Price>
						<span>Price:</span>
						<h4>
							{productPrice?.currency.symbol}
							{productPrice?.amount}
						</h4>
					</styled.Price>
					<Button
						bgColor='#00c800'
						disabled={!this.state.product.inStock}
						onClick={this.addToCart}
					>
						{this.state.product.inStock ? 'Add to Cart' : 'Out of Stock'}
					</Button>
					{this.state.product.description &&
						parse(this.state.product.description)}
				</styled.Info>
			</styled.Product>
		) : (
			<styled.H2>Product not found</styled.H2>
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
