import { Component } from 'react';
import styled from 'styled-components';
import { CartProduct } from '../types/types';

const Colors = styled.div`
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
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
		gap: 0.25rem 1rem;
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
	onClick?: (...any: any) => void;
}

class ProductAttributes extends Component<Props> {
	render() {
		return (
			<div>
				{this.props.product.attributes?.map((att) => {
					if (att.id.toLowerCase() === 'color') {
						return (
							<Colors key={att.type}>
								<span>{att.name}:</span>
								<div>
									{att.items.map((item) => {
										return (
											<Color
												key={item.value}
												onClick={(e) =>
													this.props.onClick
														? this.props.onClick(e, att, item)
														: null
												}
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
								<span>{att.name}:</span>
								<div>
									{att.items.map((item) => {
										return (
											<OtherAtt
												key={item.value}
												onClick={(e) =>
													this.props.onClick
														? this.props.onClick(e, att, item)
														: null
												}
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

export default ProductAttributes;
