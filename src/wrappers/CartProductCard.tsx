import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../redux/store';
import {
	decrementProduct,
	incrementProduct,
	removeProduct,
} from '../redux-slices/cartSlice';
import Image from '../reusables/Image';
import { CartProductWithUID, Currency } from '../types/types';
import ProductAttributes from './ProductAttributes';
import { Link } from 'react-router-dom';
import Button from '../reusables/Button';

const Product = styled.li`
	display: flex;
	gap: 0.5rem;
	margin: 1rem;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: auto;
	gap: 2rem;

	> button {
		white-space: nowrap;
	}
`;

const Info = styled.div<{ bigger?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-right: auto;

	h3,
	h4 {
		font-weight: 600;

		&:nth-child(2) {
			font-weight: 400;
		}
	}

	${({ bigger }) =>
		!bigger &&
		`
		h3, h4 {
			margin: 0;
			font-weight: 400;

			&:nth-child(3) {
			font-weight: 500;
		}
  `}
`;

const ProductCounter = styled.div`
	display: flex;
	flex-direction: column;

	span {
		margin: auto;
		font-weight: 600;
	}
`;

const DecBtn = styled.div<{ bigger?: boolean }>`
	width: ${({ bigger }) => (bigger ? '32px' : '24px')};
	height: ${({ bigger }) => (bigger ? '32px' : '24px')};
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

const GalleryWrapper = styled.div<{ width?: string; height?: string }>`
	width: ${({ width }) => width || '120px'};
	height: ${({ height }) => height || '160px'};
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
	removeProduct: (product: CartProductWithUID) => void;
	incrementProduct: (product: CartProductWithUID) => void;
	decrementProduct: (product: CartProductWithUID) => void;
	gallery?: boolean;
	bigger?: boolean;
	removeBtn?: boolean;
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

	remove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		this.props.removeProduct(this.props.product);
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
			<Product>
				<Details>
					<Info bigger={this.props.bigger}>
						{this.props.bigger ? (
							<Link to={`/product/${this.props.product.id}`}>
								<h3>{this.props.product.brand}</h3>
								<h3>{this.props.product.name}</h3>
								<h4>
									{price?.currency.symbol}
									{price?.amount}
								</h4>
							</Link>
						) : (
							<>
								<h4>{this.props.product.brand}</h4>
								<h4>{this.props.product.name}</h4>
								<h4>
									{price?.currency.symbol}
									{price?.amount}
								</h4>
							</>
						)}
						<ProductAttributes
							product={this.props.product}
							bigger={this.props.bigger}
						/>
					</Info>
					{this.props.removeBtn && (
						<Button
							bgColor='#e10000'
							border='#000000'
							margin='auto 0 0 0'
							onClick={this.remove}
						>
							Remove Product
						</Button>
					)}
				</Details>
				<ProductCounter>
					<IncBtn
						onClick={(e) => this.increment(e, this.props.product)}
						bigger={this.props.bigger}
					/>
					<span>{this.props.product.count}</span>
					<DecBtn
						onClick={(e) => this.decrement(e, this.props.product)}
						bigger={this.props.bigger}
					/>
				</ProductCounter>
				{this.props.gallery ? (
					<GalleryWrapper
						width={this.props.bigger ? '180px' : '120px'}
						height={this.props.bigger ? '240px' : '160px'}
					>
						<Image
							src={this.props.product.gallery[this.state.activeImageIndex]}
							width={this.props.bigger ? '180px' : '120px'}
							height={this.props.bigger ? '240px' : '160px'}
						/>
						<Arrows>
							<ArrowPrev onClick={this.prevImage} />
							<ArrowNext onClick={this.nextImage} />
						</Arrows>
					</GalleryWrapper>
				) : (
					<Image
						src={this.props.product.gallery[this.state.activeImageIndex]}
						width={this.props.bigger ? '180px' : '120px'}
						height={this.props.bigger ? '240px' : '160px'}
					/>
				)}
			</Product>
		);
	}
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		removeProduct: (product: CartProductWithUID) =>
			dispatch(removeProduct(product)),
		incrementProduct: (product: CartProductWithUID) =>
			dispatch(incrementProduct(product)),
		decrementProduct: (product: CartProductWithUID) =>
			dispatch(decrementProduct(product)),
	};
}

export default connect(null, mapDispatchToProps)(CartProductCard);
