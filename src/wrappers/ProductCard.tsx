import { Component } from 'react';
import { Currency, Product } from '../types/types';
import styled from 'styled-components';

interface Props {
	product: Product;
	selectedCurrency: Currency;
	addItem: (product: Product) => void;
}

const Card = styled.div`
	margin: 2rem;
	display: flex;
	flex-direction: column;
	max-width: 300px;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 300px;
	height: 300px;
`;

const Image = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

const CartIcon = styled.div`
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

	&:hover {
		transform: scale(1.25);
		background-color: #00c100;
	}
`;

const Details = styled.div`
	margin: 0 0.5rem;
`;

class ProductCard extends Component<Props> {
	render() {
		const itemPrice = this.props.product.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Card key={this.props.product.name}>
				<ImageWrapper>
					<Image src={this.props.product.gallery[0]} alt='' />
					<CartIcon onClick={() => this.props.addItem(this.props.product)}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
							<path
								fill='#ffffff'
								d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
								data-name='Shopping Cart'
							/>
						</svg>
					</CartIcon>
				</ImageWrapper>
				<Details>
					<h4>
						{this.props.product.brand} {this.props.product.name}
					</h4>
					<h4>{`${itemPrice?.currency.symbol}${itemPrice?.amount}`}</h4>
				</Details>
			</Card>
		);
	}
}

export default ProductCard;
