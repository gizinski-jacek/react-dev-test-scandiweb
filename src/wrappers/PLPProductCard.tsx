import { Component } from 'react';
import { CartProduct, CartProductWithUID, Currency } from '../types/types';
import * as styled from '../styled/PLPProductCard.styled';
import { AppDispatch, RootState } from '../redux/store';
import { addProduct } from '../redux-slices/cartSlice';
import { connect } from 'react-redux';
import Image from '../reusables/Image';
import roundToDecimal from '../utils/roundToDecimal';

class PLPProductCard extends Component<StateProps & OwnProps & DispatchProps> {
	addToCart = () => {
		if (!this.props.product) return;
		this.props.addProduct(this.props.product);
	};

	render() {
		const price = this.props.product.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return (
			<styled.Card>
				<styled.CardLink to={`/product/${this.props.product.id}`} />
				<styled.Img>
					<Image
						src={this.props.product.gallery[0]}
						inStock={this.props.product.inStock}
						height={'320px'}
					>
						{this.props.product.inStock && (
							<styled.CartIcon onClick={this.addToCart}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path
										fill='#ffffff'
										d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
										data-name='Shopping Cart'
									/>
								</svg>
							</styled.CartIcon>
						)}
					</Image>
				</styled.Img>
				<styled.Details>
					<h4>
						{this.props.product.brand} {this.props.product.name}
					</h4>
					{price && (
						<h4>{`${price.currency.symbol}${roundToDecimal(
							price.amount,
							2
						)}`}</h4>
					)}
				</styled.Details>
			</styled.Card>
		);
	}
}

interface StateProps {
	selectedCurrency: Currency;
}

interface OwnProps {
	product: CartProduct;
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

export default connect(mapStateToProps, mapDispatchToProps)(PLPProductCard);
