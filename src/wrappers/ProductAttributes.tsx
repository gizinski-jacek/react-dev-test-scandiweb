import { Component } from 'react';
import * as styled from '../styled/ProductAttributes.styled';
import {
	Attribute,
	AttributeSet,
	CartProduct,
	CartProductWithUID,
} from '../types/types';

interface Props {
	product: CartProductWithUID | CartProduct;
	onClick?: (
		attribute: AttributeSet,
		attributeItem: Attribute,
		product: CartProductWithUID | CartProduct
	) => void;
	bigger?: boolean;
}

class ProductAttributes extends Component<Props> {
	render() {
		return (
			<styled.Container bigger={this.props.bigger}>
				{this.props.product.attributes?.map((att) => {
					return (
						<styled.Attributes key={att.id}>
							<span>{att.name}:</span>
							<div>
								{att.items.map((item) => {
									const selected =
										this.props.product.selectedAttributes.find(
											(a) => a.id === att.id
										)?.item.id === item.id;
									if (att.type.toLowerCase() === 'swatch') {
										return (
											<styled.Color
												key={item.value}
												onClick={() =>
													this.props.onClick && !selected
														? this.props.onClick(att, item, this.props.product)
														: null
												}
												bgColor={item.value}
												selected={selected}
												bigger={this.props.bigger}
											/>
										);
									} else {
										return (
											<styled.OtherAtt
												key={item.value}
												onClick={() =>
													this.props.onClick && !selected
														? this.props.onClick(att, item, this.props.product)
														: null
												}
												selected={selected}
												cursor={this.props.onClick ? true : false}
												bigger={this.props.bigger}
											>
												{item.value}
											</styled.OtherAtt>
										);
									}
								})}
							</div>
						</styled.Attributes>
					);
				})}
			</styled.Container>
		);
	}
}

export default ProductAttributes;
