import { Component } from 'react';
import {
	CartAttributeSet,
	CartProduct,
	Currency,
	Product,
} from '../types/types';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { addItem } from '../features/cartSlice';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	transition: 0.25s ease-in-out;
	text-decoration: none;
	color: #000000;

	&:hover {
		box-shadow: 0 0 1rem 0.25rem #00000040;

		div {
			opacity: 1;
		}
	}
`;

const ImageWrapper = styled.div.attrs((props: { inStock: boolean }) => ({
	inStock: props.inStock ? '' : '',
}))`
	max-width: 280px;
	height: 280px;
	position: relative;

	&.out-of-stock {
		img {
			opacity: 0.25;
		}

		:before {
			font-size: 1.5rem;
			white-space: nowrap;
			content: 'Out of Stock';
			text-transform: uppercase;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

const Image = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

const CartIcon = styled.div`
	opacity: 0;
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
	}
`;

const Details = styled.div`
	flex: 1;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

interface Props {
	product: Product;
	selectedCurrency: Currency;
	addItem: (product: CartProduct) => void;
}

class PLPProductCard extends Component<Props> {
	add = (product: Product) => {
		const defaultAttributes: CartAttributeSet[] = product.attributes.map(
			(att) => {
				return {
					id: att.id,
					name: att.name,
					type: att.type,
					item: att.items[0],
				};
			}
		);
		const item: CartProduct = {
			...product,
			uid: nanoid(),
			count: 1,
			selectedAttributes: defaultAttributes,
		};
		this.props.addItem(item);
	};

	render() {
		const itemPrice = this.props.product.prices.find(
			(price) => price.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Card
				key={this.props.product.name}
				to={`/product/${this.props.product.id}`}
			>
				<ImageWrapper
					className={`${!this.props.product.inStock ? 'out-of-stock' : ''}`}
				>
					<Image src={this.props.product.gallery[0]} alt='' />
					{this.props.product.inStock && (
						<CartIcon onClick={() => this.add(this.props.product)}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
								<path
									fill='#ffffff'
									d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
									data-name='Shopping Cart'
								/>
							</svg>
						</CartIcon>
					)}
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

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addItem: (product: CartProduct) => dispatch(addItem(product)),
	};
}

export default connect(null, mapDispatchToProps)(PLPProductCard);
