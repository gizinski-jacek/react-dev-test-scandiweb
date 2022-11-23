import React, { Component } from 'react';
import * as styled from '../styled/SideCart.styled';
import Button from '../reusables/Button';
import { CartProductWithUID, Currency } from '../types/types';
import roundToDecimal from '../utils/roundToDecimal';
import CartProductCard from '../wrappers/CartProductCard';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';

class SideCart extends Component<StateProps & OwnProps> {
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
		return (
			<styled.Cart>
				<div onClick={this.props.toggle}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path
							fill='#000000'
							d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
							data-name='Shopping Cart'
						/>
					</svg>
					<styled.CartProductCount>{productCount}</styled.CartProductCount>
				</div>
				{this.props.open && (
					<styled.Contents>
						<styled.Header>
							<h4>My Bag</h4>
							{productCount} items
						</styled.Header>
						<styled.ProductList>
							{this.props.cart.map((product) => (
								<CartProductCard
									key={product.uid}
									product={product}
									navigateTo={this.props.navigateTo}
								/>
							))}
						</styled.ProductList>
						<styled.Footer>
							<styled.Total>
								<span>Total</span>
								<span>
									{this.props.selectedCurrency.symbol}
									{roundToDecimal(total, 2)}
								</span>
							</styled.Total>
							<styled.Controls>
								<Button
									bgColor='#ffffff'
									color='#000000'
									border='#000000'
									onClick={() => this.props.navigateTo('/cart')}
								>
									View Bag
								</Button>
								<Button bgColor='#00c800' color='#ffffff' onClick={() => {}}>
									Check Out
								</Button>
							</styled.Controls>
						</styled.Footer>
					</styled.Contents>
				)}
			</styled.Cart>
		);
	}
}

interface StateProps {
	cart: CartProductWithUID[];
	selectedCurrency: Currency;
}

type OwnProps = {
	open: boolean;
	toggle: (e: React.MouseEvent<HTMLDivElement>) => void;
	navigateTo: (string: string) => void;
};

function mapStateToProps(state: RootState, ownProps: OwnProps) {
	return { cart: state.cart, selectedCurrency: state.currency, ...ownProps };
}

export default connect(mapStateToProps)(SideCart);
