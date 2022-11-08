import { Component } from 'react';
import styled from 'styled-components';
import {
	Attribute,
	AttributeSet,
	CartProduct,
	CartProductWithUID,
} from '../types/types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Attributes = styled.div`
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
	background-color: ${({ bgColor }) => bgColor || '#000000'};

	${({ selected }) =>
		selected &&
		`
		&:before {
		border: 2px solid #64ff00;
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
	}
  `}
`;

const OtherAtt = styled.div<{ clickable?: boolean; selected: boolean }>`
	flex: 1;
	display: flex;
	justify-content: center;
	padding: 0.5rem;
	border: 1px solid #000000;
	position: relative;
	cursor: pointer;

	${({ clickable }) =>
		clickable &&
		`
		transition: 0.1s ease-in-out;

		&:hover {
			box-shadow: 0 0 1px 1px #960096;
			border-color: #960096;
		}

		&:active {
			box-shadow: 0 0 2px 2px #960096;
			border-color: #960096;
		}
  `}

	${({ selected }) =>
		selected &&
		`
		background-color: #000000;
		color: #ffffff;

		&:hover {
			border: 1px solid #000000;
			box-shadow: none;
		}

		&:active {
			border: 1px solid #000000;
			box-shadow: none;
		}
  `}
`;

interface Props {
	product: CartProductWithUID | CartProduct;
	onClick?: (
		attribute: AttributeSet,
		attributeItem: Attribute,
		product: CartProductWithUID | CartProduct
	) => void;
}

class ProductAttributes extends Component<Props> {
	render() {
		return (
			<Container>
				{this.props.product.attributes?.map((att) => {
					if (att.id.toLowerCase() === 'color') {
						return (
							<Attributes key={att.id}>
								<span>{att.name}:</span>
								<div>
									{att.items.map((item) => {
										const selected =
											this.props.product.selectedAttributes.find(
												(a) => a.id === att.id
											)?.item.id === item.id;
										return (
											<Color
												key={item.value}
												onClick={(e) =>
													this.props.onClick && !selected
														? this.props.onClick(att, item, this.props.product)
														: null
												}
												bgColor={item.value}
												selected={selected}
											/>
										);
									})}
								</div>
							</Attributes>
						);
					} else {
						return (
							<Attributes key={att.id}>
								<span>{att.name}:</span>
								<div>
									{att.items.map((item) => {
										const selected =
											this.props.product.selectedAttributes.find(
												(a) => a.id === att.id
											)?.item.id === item.id;
										return (
											<OtherAtt
												key={item.value}
												onClick={(e) =>
													this.props.onClick && !selected
														? this.props.onClick(att, item, this.props.product)
														: null
												}
												selected={selected}
												clickable={this.props.onClick ? true : false}
											>
												{item.value}
											</OtherAtt>
										);
									})}
								</div>
							</Attributes>
						);
					}
				})}
			</Container>
		);
	}
}

export default ProductAttributes;
