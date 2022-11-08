import { Component } from 'react';
import styled from 'styled-components';
import { Attribute, AttributeSet, CartProduct } from '../types/types';

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
	user-select: none;

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

const OtherAtt = styled.div<{ selected: boolean }>`
	flex: 1;
	display: flex;
	justify-content: center;
	padding: 0.5rem;
	border: 1px solid #000000;
	cursor: pointer;
	position: relative;
	user-select: none;

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

interface Props {
	product: CartProduct;
	onClick?: (
		e: React.MouseEvent<HTMLDivElement>,
		attribute: AttributeSet,
		attributeItem: Attribute
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
													this.props.product.selectedAttributes.find(
														(a) => a.id === att.id
													)?.item.id === item.id
												}
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
										return (
											<OtherAtt
												key={item.value}
												onClick={(e) =>
													this.props.onClick
														? this.props.onClick(e, att, item)
														: null
												}
												selected={
													this.props.product.selectedAttributes.find(
														(a) => a.id === att.id
													)?.item.id === item.id
												}
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
