import { Component } from 'react';
import { CartProduct, CartProductWithUID, Currency } from '../types/types';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { addProduct } from '../features/cartSlice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '../reusables/Image';

const Card = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	transition: 0.25s ease-in-out;
	text-decoration: none;
	color: #000000;
	position: relative;

	&:hover {
		box-shadow: 0 0 1rem 0.25rem #dadada;

		div {
			opacity: 1;
		}
	}
`;

const CardLink = styled(Link)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	z-index: 1;
`;

const CartIcon = styled.div`
	opacity: 0;
	display: block;
	position: absolute;
	right: 8px;
	bottom: -16px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #00c800;
	transition: 0.25s ease-in-out;
	cursor: pointer;
	z-index: 3;

	&:hover {
		transform: scale(1.25);
	}
`;

const Details = styled.div`
	flex: 1;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

interface Props {
	product: CartProduct;
	selectedCurrency: Currency;
	addProduct: (product: CartProductWithUID | CartProduct) => void;
}

class PLPProductCard extends Component<Props> {
	addToCart = () => {
		if (!this.props.product) return;
		this.props.addProduct(this.props.product);
	};

	render() {
		const productPrice = this.props.product.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Card key={this.props.product.name}>
				<CardLink to={`/product/${this.props.product.id}`} />
				<Image
					src={this.props.product.gallery[0]}
					inStock={this.props.product.inStock}
					maxWidth={'280px'}
					height={'280px'}
				>
					{this.props.product.inStock && (
						<CartIcon onClick={this.addToCart}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
								<path
									fill='#ffffff'
									d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
									data-name='Shopping Cart'
								/>
							</svg>
						</CartIcon>
					)}
				</Image>
				<Details>
					<h4>
						{this.props.product.brand} {this.props.product.name}
					</h4>
					<h4>{`${productPrice?.currency.symbol}${productPrice?.amount}`}</h4>
				</Details>
			</Card>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addProduct: (product: CartProductWithUID | CartProduct) =>
			dispatch(addProduct(product)),
	};
}

export default connect(null, mapDispatchToProps)(PLPProductCard);
