import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../redux/store';
import { decrementProduct, incrementProduct } from '../features/cartSlice';
import Image from '../reusables/Image';
import { CartProductWithUID, Currency } from '../types/types';
import ProductAttributes from './ProductAttributes';

const Product = styled.li<{ bordered?: boolean }>`
	display: flex;
	margin: 1rem;
`;

const Details = styled.div<{ bigger?: boolean }>`
	flex: 1;
	display: flex;
	flex-direction: column;
	max-width: 400px;
	margin-right: auto;

	h4 {
		font-size: 1.25rem;
		margin: 0.25rem 0;
	}

	h4:first-child {
		font-size: 1.5rem;
		font-weight: 600;
	}

	h5 {
		font-weight: 600;
	}
`;

const ProductCounter = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 1rem;

	span {
		margin: auto;
	}
`;

const DecBtn = styled.div`
	width: 24px;
	height: 24px;
	border: 1px solid #000000;
	cursor: pointer;
	font-size: 1.25rem;
	position: relative;
	transition: 0.1s ease-in-out;

	&:hover {
		box-shadow: 0 0 1px 1px #960096;
		border-color: #960096;
	}

	&:active {
		box-shadow: 0 0 2px 2px #960096;
		border-color: #960096;
	}

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

const ArrowsWrapper = styled.div`
	width: 120px;
	height: 160px;
	position: relative;
`;

const Arrows = styled.div`
	display: flex;
	gap: 0.5rem;
	margin: 0.5rem;
	position: absolute;
	bottom: 0;
	right: 0;
`;

const ArrowPrev = styled.div`
	width: 20px;
	height: 20px;
	background-color: #000000;
	cursor: pointer;
	font-size: 1.25rem;
	position: relative;
	opacity: 0.75;
	transition: 0.1s ease-in-out;

	&:before {
		content: '';
		display: block;
		width: 8px;
		height: 2px;
		background-color: #ffffff;
		position: absolute;
		top: 5px;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform: rotate(45deg);
	}

	&:after {
		content: '';
		display: block;
		width: 2px;
		height: 8px;
		background-color: #ffffff;
		position: absolute;
		top: -5px;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform: rotate(45deg);
	}

	&:hover {
		opacity: 1;
		box-shadow: 0 0 1px 1px #960096;
		border-color: #960096;
	}

	&:active {
		box-shadow: 0 0 2px 2px #960096;
		border-color: #960096;
	}
`;

const ArrowNext = styled(ArrowPrev)`
	transform: rotateY(180deg);
`;

interface State {
	activeImageIndex: number;
}

interface Props {
	product: CartProductWithUID;
	selectedCurrency: Currency;
	incrementProduct: (product: CartProductWithUID) => void;
	decrementProduct: (product: CartProductWithUID) => void;
	gallery?: boolean;
	bordered?: boolean;
	bigger?: boolean;
}

class CartProductCard extends Component<Props> {
	state: State = { activeImageIndex: 0 };

	prevImage = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (this.state.activeImageIndex === 0) {
			this.setState({
				...this.state,
				activeImageIndex: this.props.product.gallery.length - 1,
			});
		} else {
			this.setState({
				...this.state,
				activeImageIndex: this.state.activeImageIndex - 1,
			});
		}
	};

	nextImage = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (this.state.activeImageIndex === this.props.product.gallery.length - 1) {
			this.setState({
				...this.state,
				activeImageIndex: 0,
			});
		} else {
			this.setState({
				...this.state,
				activeImageIndex: this.state.activeImageIndex + 1,
			});
		}
	};

	increment = (
		e: React.MouseEvent<HTMLDivElement>,
		product: CartProductWithUID
	) => {
		e.stopPropagation();
		this.props.incrementProduct(product);
	};

	decrement = (
		e: React.MouseEvent<HTMLDivElement>,
		product: CartProductWithUID
	) => {
		e.stopPropagation();
		this.props.decrementProduct(product);
	};

	render() {
		const price = this.props.product.prices.find(
			(p) => p.currency.label === this.props.selectedCurrency.label
		);
		return (
			<Product bordered={this.props.bordered}>
				<Details bigger={this.props.bigger}>
					<h4>{this.props.product.brand}</h4>
					<h4>{this.props.product.name}</h4>
					<h5>
						{price?.currency.symbol}
						{price?.amount}
					</h5>
					<ProductAttributes product={this.props.product} />
				</Details>
				<ProductCounter>
					<IncBtn onClick={(e) => this.increment(e, this.props.product)} />
					<span>{this.props.product.count}</span>
					<DecBtn onClick={(e) => this.decrement(e, this.props.product)} />
				</ProductCounter>
				{this.props.gallery ? (
					<ArrowsWrapper>
						<Image
							src={this.props.product.gallery[this.state.activeImageIndex]}
							width={'120px'}
							height={'160px'}
						/>
						<Arrows>
							<ArrowPrev onClick={this.prevImage} />
							<ArrowNext onClick={this.nextImage} />
						</Arrows>
					</ArrowsWrapper>
				) : (
					<Image
						src={this.props.product.gallery[this.state.activeImageIndex]}
						width={'120px'}
						height={'160px'}
					/>
				)}
			</Product>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementProduct: (product: CartProductWithUID) =>
			dispatch(incrementProduct(product)),
		decrementProduct: (product: CartProductWithUID) =>
			dispatch(decrementProduct(product)),
	};
}

export default connect(null, mapDispatchToProps)(CartProductCard);
