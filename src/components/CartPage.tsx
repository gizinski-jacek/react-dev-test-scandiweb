import { Component } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { decrementProduct, incrementProduct } from '../redux-slices/cartSlice';
import { CartProductWithUID, Currency } from '../types/types';
import CartProductCard from '../wrappers/CartProductCard';
import * as styled from '../styled/CartPage.styled';
import roundToDecimal from '../utils/roundToDecimal';
import Button from '../reusables/Button';

interface State {
	activeImageIndex: number;
}

interface Props {
	cart: CartProductWithUID[];
	selectedCurrency: Currency;
	incrementProduct: (product: CartProductWithUID) => void;
	decrementProduct: (product: CartProductWithUID) => void;
}

class CartPage extends Component<Props> {
	state: State = { activeImageIndex: 0 };

	render() {
		const productCount = this.props.cart.reduce(
			(total, product) => total + product.count,
			0
		);
		const total = this.props.cart.reduce(
			(total, product) =>
				total +
				product.count *
					product.prices.find(
						(p) => p.currency.label === this.props.selectedCurrency.label
					)!.amount,
			0
		);
		const tax = total * 0.21;
		return (
			<styled.Page>
				<h2>{this.props.cart.length ? 'Cart' : 'No Items In Cart'}</h2>
				{this.props.cart.length && (
					<>
						<ul>
							{this.props.cart.map((product) => (
								<CartProductCard
									key={product.uid}
									product={product}
									selectedCurrency={this.props.selectedCurrency}
									gallery={product.gallery.length > 1}
									bigger
									removeBtn
								/>
							))}
						</ul>
						<styled.Footer>
							<styled.Details>
								<div>
									<h4>Tax 21%: </h4>
									<h4>Quantity: </h4>
									<h4>Total: </h4>
								</div>
								<div>
									<h4>
										{this.props.selectedCurrency.symbol}
										{roundToDecimal(tax, 2)}
									</h4>
									<h4>{productCount}</h4>
									<h4>{roundToDecimal(total, 2)}</h4>
								</div>
							</styled.Details>
							<Button bgColor='#00c800' minWidth='200px' onClick={() => {}}>
								Order
							</Button>
						</styled.Footer>
					</>
				)}
			</styled.Page>
		);
	}
}

function mapStateToProps(state: RootState) {
	return { cart: state.cart };
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementProduct: (product: CartProductWithUID) =>
			dispatch(incrementProduct(product)),
		decrementProduct: (product: CartProductWithUID) =>
			dispatch(decrementProduct(product)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
