//@ts-nocheck

import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import {
	changeItemAttribute,
	decrementItem,
	incrementItem,
} from '../features/cartSlice';
import { Attribute, AttributeSet, CartProduct, Currency } from '../types/types';

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

const Colors = styled.div`
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0.25rem 0;
	}
`;

const Color = styled.div.attrs(
	(props: { selected: boolean; bgColor: string }) => ({
		border: props.selected ? '2px solid #64ff00' : '0',
		bgColor: props.bgColor,
	})
)`
	width: 20px;
	height: 20px;
	border: 1px solid #a1a1a1;
	cursor: pointer;
	position: relative;
	background-color: ${(props) => props.bgColor};
	user-select: none;

	&:before {
		border: ${(props) => props.border};
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
	}
`;

const OtherAttributes = styled.div`
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0.25rem 0;
	}
`;

const OtherAtt = styled.div.attrs((props: { selected: boolean }) => ({
	border: props.selected ? '2px solid #64ff00' : '0',
}))`
	display: block;
	min-width: 40px;
	text-align: center;
	padding: 0.25rem;
	border: 1px solid #000000;
	cursor: pointer;
	position: relative;
	user-select: none;

	&:before {
		border: ${(props) => props.border};
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 120px;
	height: 160px;
	user-select: none;
`;

const Image = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

interface Props {
	item: CartProduct;
	currency: Currency;
	incrementItem: (product: CartProduct) => void;
	decrementItem: (product: CartProduct) => void;
	changeItemAttribute: (product: CartProduct) => void;
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

	changeAttribute = (
		e: React.MouseEvent<HTMLDivElement>,
		attribute: AttributeSet,
		attributeItem: Attribute
	) => {
		e.stopPropagation();
		const updatedAttribute = this.props.item.selectedAttributes.map((att) =>
			att.id === attribute.id ? { ...attribute, item: attributeItem } : att
		);
		const updatedItem = {
			...this.props.item,
			selectedAttributes: updatedAttribute,
		};
		this.props.changeItemAttribute(updatedItem);
	};

	render() {
		const price = this.props.item.prices.find(
			(p) => p.currency.label === this.props.currency.label
		);
		return (
			<Item>
				<Details>
					<span>{this.props.item.brand}</span>
					<span>{this.props.item.name}</span>
					<span style={{ fontWeight: '600' }}>
						{price?.currency.symbol}
						{price?.amount}
					</span>
					{this.props.item.attributes?.map((att) => {
						if (att.id.toLowerCase() === 'color') {
							return (
								<Colors key={att.type}>
									<span>{att.name}</span>
									<div>
										{att.items.map((item) => {
											return (
												<Color
													key={item.value}
													onClick={(e) => this.changeAttribute(e, att, item)}
													selected={
														this.props.item.selectedAttributes.findIndex(
															(a) => a.item.id === item.id
														) >= 0
													}
													bgColor={item.value}
												></Color>
											);
										})}
									</div>
								</Colors>
							);
						} else {
							return (
								<OtherAttributes key={att.type}>
									<span>{att.name}</span>
									<div>
										{att.items.map((item) => {
											return (
												<OtherAtt
													key={item.value}
													onClick={(e) => this.changeAttribute(e, att, item)}
													selected={
														this.props.item.selectedAttributes.findIndex(
															(a) => a.item.id === item.id
														) >= 0
													}
												>
													{item.value}
												</OtherAtt>
											);
										})}
									</div>
								</OtherAttributes>
							);
						}
					})}
				</Details>
				<ItemCounter>
					<IncBtn onClick={(e) => this.increment(e, this.props.item)}></IncBtn>
					<span>{this.props.item.count}</span>
					<DecBtn onClick={(e) => this.decrement(e, this.props.item)}></DecBtn>
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
		incrementItem: (product: CartProduct) => dispatch(incrementItem(product)),
		decrementItem: (product: CartProduct) => dispatch(decrementItem(product)),
		changeItemAttribute: (product: CartProduct) =>
			dispatch(changeItemAttribute(product)),
	};
}

export default connect(null, mapDispatchToProps)(SideCartProductCard);
