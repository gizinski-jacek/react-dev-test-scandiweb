import { Component } from 'react';
import { connect } from 'react-redux';
import * as styled from '../styled/CartProductCard.styled';
import { AppDispatch, RootState } from '../redux/store';
import {
	decrementProduct,
	incrementProduct,
	removeProduct,
} from '../redux-slices/cartSlice';
import Image from '../reusables/Image';
import { CartProductWithUID, Currency } from '../types/types';
import ProductAttributes from './ProductAttributes';
import Button from '../reusables/Button';
import roundToDecimal from '../utils/roundToDecimal';

interface State {
	activeImageIndex: number;
}

class CartProductCard extends Component<StateProps & OwnProps & DispatchProps> {
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
			<styled.Product bigger={this.props.bigger}>
				<styled.Details>
					<styled.Info bigger={this.props.bigger}>
						<styled.ProductLink
							link={!!this.props.navigateTo}
							onClick={() =>
								this.props.navigateTo
									? this.props.navigateTo(`/product/${this.props.product.id}`)
									: null
							}
						>
							<h4>{this.props.product.brand}</h4>
							<h4>{this.props.product.name}</h4>
						</styled.ProductLink>
						{price && (
							<h4>
								{price.currency.symbol}
								{roundToDecimal(price.amount, 2)}
							</h4>
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
							onClick={() => this.props.removeProduct(this.props.product)}
						>
							Remove Product
						</Button>
					)}
				</styled.Details>
				<styled.ProductCounter height={this.props.bigger ? '160px' : '120px'}>
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
				<styled.Wrapper width={this.props.bigger ? '160px' : '120px'}>
					<Image
						src={this.props.product.gallery[this.state.activeImageIndex]}
						width={this.props.bigger ? '160px' : '120px'}
					/>
					{this.props.gallery && (
						<styled.Arrows>
							<styled.ArrowPrev onClick={this.prevImage} />
							<styled.ArrowNext onClick={this.nextImage} />
						</styled.Arrows>
					)}
				</styled.Wrapper>
			</styled.Product>
		);
	}
}

interface StateProps {
	selectedCurrency: Currency;
}

interface OwnProps {
	product: CartProductWithUID;
	gallery?: boolean;
	bigger?: boolean;
	removeBtn?: boolean;
	navigateTo?: (...any: any) => void;
}

interface DispatchProps {
	removeProduct: (product: CartProductWithUID) => void;
	incrementProduct: (product: CartProductWithUID) => void;
	decrementProduct: (product: CartProductWithUID) => void;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
	return { selectedCurrency: state.currency, ...ownProps };
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProductCard);
