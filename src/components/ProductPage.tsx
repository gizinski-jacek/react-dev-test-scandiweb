import { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from '../styled/ProductPage.styled';
import { AppDispatch, RootState } from '../redux/store';
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
import LoadingSpinner from '../reusables/LoadingSpinner';
import roundToDecimal from '../utils/roundToDecimal';

interface State {
	product: CartProduct | null;
	activeImage: string;
	loading: boolean;
}

class ProductPage extends Component<StateProps & OwnProps & DispatchProps> {
	state: State = { product: null, activeImage: '', loading: true };

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
					loading: false,
				});
			} else {
				const cartProduct = productToCartProduct(response.data.product);
				this.setState({
					...this.state,
					product: cartProduct,
					activeImage: cartProduct.gallery[0],
					loading: false,
				});
			}
		} catch (error) {
			this.setState({ ...this.state, loading: false });
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
		const price = this.state.product?.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return this.state.loading ? (
			<LoadingSpinner />
		) : this.state.product ? (
			<styled.Product>
				<styled.Gallery height={'440px'}>
					<styled.Thumbnails>
						{this.state.product.gallery.map((img, i) => (
							<Image
								key={img}
								src={img}
								width={'80px'}
								cursor={'true'}
								onClick={() => this.changeImage(i)}
							/>
						))}
					</styled.Thumbnails>
					<Image
						src={this.state.activeImage}
						height={'440px'}
						inStock={this.state.product.inStock}
					/>
				</styled.Gallery>
				<styled.Info>
					<styled.Name>
						<h3>{this.state.product.brand}</h3>
						<h3>{this.state.product.name}</h3>
					</styled.Name>
					<ProductAttributes
						product={this.state.product}
						onClick={this.changeAttribute}
						bigger
					/>
					{price && (
						<styled.Price>
							<span>Price:</span>
							<h4>
								{price.currency.symbol}
								{roundToDecimal(price.amount, 2)}
							</h4>
						</styled.Price>
					)}
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
			<styled.NotFound>
				<h2>Product not found</h2>
			</styled.NotFound>
		);
	}
}
interface StateProps {
	selectedCurrency: Currency;
}

interface OwnProps {
	withRouter: WithRouter;
}

interface DispatchProps {
	addProduct: (product: CartProductWithUID | CartProduct) => void;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
	return { selectedCurrency: state.currency, ...ownProps };
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addProduct: (product: CartProductWithUID | CartProduct) =>
			dispatch(addProduct(product)),
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
