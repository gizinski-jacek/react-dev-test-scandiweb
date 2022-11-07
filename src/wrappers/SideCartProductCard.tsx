import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { decrementItem, incrementItem } from '../features/cartSlice';
import Image from '../reusables/Image';
import { CartProduct, Currency } from '../types/types';
import ProductAttributes from './ProductAttributes';

const Item = styled.li`
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

const ItemCounter = styled.div`
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
	item: CartProduct;
	selectedCurrency: Currency;
	incrementItem: (product: CartProduct) => void;
	decrementItem: (product: CartProduct) => void;
}

class SideCartProductCard extends Component<Props> {
	increment = (e: React.MouseEvent<HTMLDivElement>, item: CartProduct) => {
		e.stopPropagation();
		this.props.incrementItem(item);
	};

	decrement = (e: React.MouseEvent<HTMLDivElement>, item: CartProduct) => {
		e.stopPropagation();
		this.props.decrementItem(item);
	};

	render() {
		const price = this.props.item.prices.find(
			(p) => p.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Item>
				<Details>
					<span>{this.props.item.brand}</span>
					<span>{this.props.item.name}</span>
					<h5>
						{price?.currency.symbol}
						{price?.amount}
					</h5>
					<ProductAttributes product={this.props.item} />
				</Details>
				<ItemCounter>
					<IncBtn onClick={(e) => this.increment(e, this.props.item)}></IncBtn>
					<span>{this.props.item.count}</span>
					<DecBtn onClick={(e) => this.decrement(e, this.props.item)}></DecBtn>
				</ItemCounter>
				<Image
					src={this.props.item.gallery[0]}
					width={'120px'}
					height={'160px'}
				/>
			</Item>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementItem: (product: CartProduct) => dispatch(incrementItem(product)),
		decrementItem: (product: CartProduct) => dispatch(decrementItem(product)),
	};
}

export default connect(null, mapDispatchToProps)(SideCartProductCard);
