import { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from '../styled/CartProductCard.styled';
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
			<styled.Product bigger={this.props.bigger}>
				<styled.Details>
					<styled.Info bigger={this.props.bigger}>
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
					</styled.Info>
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
				</styled.Details>
				<styled.ProductCounter>
					<styled.IncBtn
						onClick={(e) => this.increment(e, this.props.product)}
						bigger={this.props.bigger}
					/>
					<span>{this.props.product.count}</span>
					<styled.DecBtn
						onClick={(e) => this.decrement(e, this.props.product)}
						bigger={this.props.bigger}
					/>
				</styled.ProductCounter>
				{this.props.gallery ? (
					<styled.GalleryWrapper
						width={this.props.bigger ? '180px' : '120px'}
						height={this.props.bigger ? '240px' : '160px'}
					>
						<Image
							src={this.props.product.gallery[this.state.activeImageIndex]}
							width={this.props.bigger ? '180px' : '120px'}
							height={this.props.bigger ? '240px' : '160px'}
						/>
						<styled.Arrows>
							<styled.ArrowPrev onClick={this.prevImage} />
							<styled.ArrowNext onClick={this.nextImage} />
						</styled.Arrows>
					</styled.GalleryWrapper>
				) : (
					<Image
						src={this.props.product.gallery[this.state.activeImageIndex]}
						width={this.props.bigger ? '180px' : '120px'}
						height={this.props.bigger ? '240px' : '160px'}
					/>
				)}
			</styled.Product>
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
