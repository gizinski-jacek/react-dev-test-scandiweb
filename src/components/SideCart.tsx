import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import { CartProductWithUID, Currency, WithRouter } from '../types/types';
import roundToDecimal from '../utils/roundToDecimal';
import CartProductCard from '../wrappers/CartProductCard';

const Cart = styled.div`
	position: relative;
	width: 40px;
	cursor: pointer;

	.side-cart-contents {
		width: 400px;
		max-height: 75vh;
		cursor: initial;
		position: absolute;
		margin-top: 1rem;
		right: 0;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		z-index: 10;
	}

	.side-cart-product-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: scroll;
	}
`;

const CartProductCount = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
	padding: 2px;
	text-align: center;
	color: #ffffff;
	background-color: #000000;
	border-radius: 50%;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin: 0.5rem;
	cursor: initial;

	h4 {
		margin: 0.5rem;
		font-weight: 600;
	}
`;

const Footer = styled.div`
	padding: 1rem;
	position: sticky;
	bottom: 0;
	background-color: #ffffff;

	.side-cart-controls {
		display: flex;
		gap: 1rem;

		button {
			flex: 1;
		}
	}
`;

const Total = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem 0;
	font-size: 1.25rem;
	font-weight: 600;
`;

interface Props {
	withRouter: WithRouter;
	cart: CartProductWithUID[];
	open: boolean;
	toggle: (e: React.MouseEvent<HTMLDivElement>) => void;
	selectedCurrency: Currency;
}

class SideCart extends Component<Props> {
	navigateToCart = () => {
		this.setState({
			...this.state,
			currencySelectOpen: false,
			sideCartOpen: false,
		});
		this.props.withRouter.navigate('/cart');
	};

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
			<Cart>
				<div onClick={this.props.toggle}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path
							fill='#000000'
							d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
							data-name='Shopping Cart'
						/>
					</svg>
					<CartProductCount>{productCount}</CartProductCount>
				</div>
				{this.props.open && (
					<div className='side-cart-contents'>
						<Header>
							<h4>My Bag</h4>
							{productCount} items
						</Header>
						<ul className='side-cart-product-list'>
							{this.props.cart.map((product, i) => (
								<CartProductCard
									key={i}
									product={product}
									selectedCurrency={this.props.selectedCurrency}
								/>
							))}
						</ul>
						<Footer>
							<Total>
								<span>Total</span>
								<span>
									{this.props.selectedCurrency.symbol}
									{roundToDecimal(total, 2)}
								</span>
							</Total>
							<div className='side-cart-controls'>
								<Button
									bgColor='#ffffff'
									color='#000000'
									border='#000000'
									onClick={this.navigateToCart}
								>
									View Bag
								</Button>
								<Button
									bgColor='#00c800'
									color='#ffffff'
									onClick={this.navigateToCart}
								>
									Check Out
								</Button>
							</div>
						</Footer>
					</div>
				)}
			</Cart>
		);
	}
}

function mapStateToProps(state: RootState) {
	return { cart: state.cart };
}

export default withRouter(connect(mapStateToProps, null)(SideCart));
