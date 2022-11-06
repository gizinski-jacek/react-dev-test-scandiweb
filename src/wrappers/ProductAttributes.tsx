import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { changeItemAttribute } from '../features/cartSlice';
import { Attribute, AttributeSet, CartProduct } from '../types/types';

const Colors = styled.div`
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0.25rem 0;
	}
`;

const Color = styled.div<{ selected: boolean; bgColor: string }>`
	width: 20px;
	height: 20px;
	border: 1px solid #a1a1a1;
	cursor: pointer;
	position: relative;
	background-color: ${(props) => props.bgColor};
	user-select: none;

	&:before {
		border: ${(props) => (props.selected ? '2px solid #64ff00' : '0')};
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

const OtherAtt = styled.div<{ selected: boolean }>`
	display: block;
	min-width: 40px;
	text-align: center;
	padding: 0.25rem;
	border: 1px solid #000000;
	cursor: pointer;
	position: relative;
	user-select: none;

	&:before {
		border: ${(props) => (props.selected ? '2px solid #64ff00' : '0')};
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
	}
`;

interface Props {
	product: CartProduct;
	changeItemAttribute: (product: CartProduct) => void;
}

class ProductAttributes extends Component<Props> {
	changeAttribute = (
		e: React.MouseEvent<HTMLDivElement>,
		attribute: AttributeSet,
		attributeItem: Attribute
	) => {
		e.stopPropagation();
		const updatedAttribute = this.props.product.selectedAttributes.map((att) =>
			att.id === attribute.id ? { ...attribute, item: attributeItem } : att
		);
		const updatedItem = {
			...this.props.product,
			selectedAttributes: updatedAttribute,
		};
		this.props.changeItemAttribute(updatedItem);
	};

	render() {
		return (
			<div>
				{this.props.product.attributes?.map((att) => {
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
												bgColor={item.value}
												selected={
													this.props.product.selectedAttributes.findIndex(
														(a) => a.item.id === item.id
													) >= 0
												}
											/>
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
													this.props.product.selectedAttributes.findIndex(
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
			</div>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		changeItemAttribute: (product: CartProduct) =>
			dispatch(changeItemAttribute(product)),
	};
}

export default connect(null, mapDispatchToProps)(ProductAttributes);
