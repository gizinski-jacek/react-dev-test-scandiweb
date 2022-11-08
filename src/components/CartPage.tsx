import { Component } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { decrementProduct, incrementProduct } from '../features/cartSlice';
import { CartProductWithUID, Currency } from '../types/types';
import CartProductCard from '../wrappers/CartProductCard';
import styled from 'styled-components';
import roundToDecimal from '../utils/roundToDecimal';

const Page = styled.div`
	> li {
		padding: 1rem 0;
		max-height: 320px;
		border: 0 solid #00000010;
		border-width: 0 0 2px 0;

		&:first-child {
			border-width: 2px 0 2px 0;
		}
	}
`;

const Details = styled.div`
	margin: 1rem;
	display: flex;
	gap: 1rem;

	> div:nth-child(2) {
		font-weight: 600;
	}
`;

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
			<Page>
				{this.props.cart.map((product) => (
					<CartProductCard
						product={product}
						selectedCurrency={this.props.selectedCurrency}
						gallery={true}
						bordered={true}
						bigger={true}
					/>
				))}
				<Details>
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
				</Details>
			</Page>
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
