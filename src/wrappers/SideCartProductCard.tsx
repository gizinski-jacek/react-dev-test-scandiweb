import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { decrementProduct, incrementProduct } from '../features/cartSlice';
import Image from '../reusables/Image';
import { CartProduct, Currency } from '../types/types';
import ProductAttributes from './ProductAttributes';

const Product = styled.li`
	display: flex;
	margin: 1rem;
`;

const Details = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	span {
		margin-bottom: 0.5rem;
	}

	h5 {
		margin: 0;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
`;

const ProductCounter = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 1rem;
	user-select: none;

	span {
		margin: auto;
	}
`;

const DecBtn = styled.div`
	width: 24px;
	height: 24px;
	text-align: center;
	border: 1px solid #000000;
	cursor: pointer;
	font-size: 1.25rem;
	position: relative;

	&:before {
		content: '';
		display: block;
		width: 12px;
		height: 2px;
		background-color: #000000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
`;

const IncBtn = styled(DecBtn)`
	&:after {
		content: '';
		display: block;
		width: 2px;
		height: 12px;
		background-color: #000000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
`;

interface Props {
	product: CartProduct;
	selectedCurrency: Currency;
	incrementProduct: (product: CartProduct) => void;
	decrementProduct: (product: CartProduct) => void;
}

class SideCartProductCard extends Component<Props> {
	increment = (e: React.MouseEvent<HTMLDivElement>, product: CartProduct) => {
		e.stopPropagation();
		this.props.incrementProduct(product);
	};

	decrement = (e: React.MouseEvent<HTMLDivElement>, product: CartProduct) => {
		e.stopPropagation();
		this.props.decrementProduct(product);
	};

	render() {
		const price = this.props.product.prices.find(
			(p) => p.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Product>
				<Details>
					<span>{this.props.product.brand}</span>
					<span>{this.props.product.name}</span>
					<h5>
						{price?.currency.symbol}
						{price?.amount}
					</h5>
					<ProductAttributes product={this.props.product} />
				</Details>
				<ProductCounter>
					<IncBtn
						onClick={(e) => this.increment(e, this.props.product)}
					></IncBtn>
					<span>{this.props.product.count}</span>
					<DecBtn
						onClick={(e) => this.decrement(e, this.props.product)}
					></DecBtn>
				</ProductCounter>
				<Image
					src={this.props.product.gallery[0]}
					width={'120px'}
					height={'160px'}
				/>
			</Product>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementProduct: (product: CartProduct) =>
			dispatch(incrementProduct(product)),
		decrementProduct: (product: CartProduct) =>
			dispatch(decrementProduct(product)),
	};
}

export default connect(null, mapDispatchToProps)(SideCartProductCard);
