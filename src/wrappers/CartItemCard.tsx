//@ts-nocheck

import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { incrementItem } from '../features/cartSlice';
import { CartProduct, Currency } from '../types/types';

const Item = styled.li`
	display: flex;
`;

const Details = styled.div`
	flex: 1;
`;

const ItemCounter = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0.5rem;

	span {
		margin: auto;
	}
`;

const CounterBtn = styled.div`
	padding: 0.25rem;
	text-align: center;
	border: 1px solid #000000;
	cursor: pointer;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 120px;
	height: 160px;
`;

const Image = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

interface Props {
	item: CartProduct;
	currency: Currency;
	incrementItem: (product: Product) => void;
	decrementItem: (product: Product) => void;
}

class CartItemCard extends Component<Props> {
	render() {
		console.log(this.props);
		const price = this.props.item.prices.find(
			(p) => p.currency.label === this.props.currency.label
		);
		return (
			<Item>
				<Details>
					<span>{this.props.item.brand}</span>
					<span>{this.props.item.name}</span>
					<span>
						{price?.currency.symbol}
						{price?.amount}
					</span>
					{this.props.item.attributes?.map((att) => {
						if (att.id.toLowerCase() === 'color') {
							return (
								<div key={att.type}>
									<span>{att.name}</span>
									{att.items.map((item) => {
										return (
											<div
												key={item.value}
												style={{
													backgroundColor: item.value,
													width: '20px',
													height: '20px',
													cursor: 'pointer',
												}}
											></div>
										);
									})}
								</div>
							);
						} else {
							return (
								<div key={att.type}>
									<span>{att.name}</span>
									{att.items.map((item) => {
										return <div key={item.value}>{item.value}</div>;
									})}
								</div>
							);
						}
					})}
				</Details>
				<ItemCounter>
					<CounterBtn onClick={() => incrementItem()}>+</CounterBtn>
					<span>{this.props.item.count}</span>
					<CounterBtn onClick={() => decrementItem()}>-</CounterBtn>
				</ItemCounter>
				<ImageWrapper>
					<Image src={this.props.item.gallery[0]} />
				</ImageWrapper>
			</Item>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementItem: (product: Product) => dispatch(incrementItem(product)),
		decrementItem: (product: Product) => dispatch(decrementItem(product)),
	};
}

export default connect(null, mapDispatchToProps)(CartItemCard);
