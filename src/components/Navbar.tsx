import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import withRouter from '../HOC/withRouter';
import Button from '../reusables/Button';
import { CartProduct, Category, Currency, WithRouter } from '../types/types';
import SideCartProductCard from '../wrappers/SideCartProductCard';

const Nav = styled.nav`
	padding: 1rem 4rem;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	position: relative;
`;

const Blur = styled.div`
	background-color: #00000040;
	position: absolute;
	top: 5rem;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
	flex: 1;
`;

const CategoryLink = styled(Link)`
	display: inline-block;
	padding: 1rem;
	text-transform: uppercase;
	text-decoration: none;
	color: #000000;

	&.active {
		border-bottom: 2px solid #00c800;
		color: #00c800;
	}
`;

const Logo = styled.div`
	width: 40px;
	height: 40px;
	fill: #ffffff;
`;

const NavControls = styled.div`
	display: flex;

	> div {
		margin-left: 1rem;
	}
`;

const CurrencySelect = styled.div`
	position: relative;
	cursor: pointer;
	}

	.currency-icon {
		display:flex;
		align-items:center;
	}

	.currency-item-list {
		position: absolute;
		margin-top:1rem;
		left: 0;
		overflow: hidden;
	}

`;

const CurrencyItem = styled.div`
	padding: 1rem;
	background-color: #ffffff;

	&.selected {
		background-color: #c7c7c7;
	}
`;

const CartItemCount = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
	padding: 2px;
	text-align: center;
	color: #ffffff;
	background-color: #000000;
	border-radius: 50%;
`;

const SideCart = styled.div`
	position: relative;
	width: 40px;
	cursor: pointer;

	.side-cart-contents {
		width: 360px;
		max-width: 360px;
		max-height: 75vh;
		overflow: scroll;
		cursor: initial;
		position: absolute;
		margin-top: 1rem;
		right: 0;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		z-index: 10;
	}

	.side-cart-item-list {
		flex: 1;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin: 0 1rem;
	cursor: initial;

	h4 {
		margin: 0.5rem 0.5rem 0.5rem 0;
		font-weight: 600;
	}
`;

const Footer = styled.div`
	padding: 1rem;
	position: sticky;
	bottom: 0;
	background-color: #ffffff;

	.side-cart-controls {
		display: flex;
		gap: 1rem;
	}
`;

const Total = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem 0;
	font-size: 1.25rem;
	font-weight: 600;
`;

interface State {
	currencySelectOpen: boolean;
	sideCartOpen: boolean;
	ref: any;
}

interface Props {
	withRouter: WithRouter;
	categoryList: Category[];
	changeCurrency: (currency: Currency) => void;
	currencyList: Currency[];
	selectedCurrency: Currency;
	cart: CartProduct[];
}

class Navbar extends Component<Props> {
	state: State = {
		currencySelectOpen: false,
		sideCartOpen: false,
		ref: createRef(),
	};

	toggleCurrencySelectorVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			currencySelectOpen: !this.state.currencySelectOpen,
			sideCartOpen: false,
		});
	};

	toggleSideCartVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			sideCartOpen: !this.state.sideCartOpen,
			currencySelectOpen: false,
		});
	};

	outsideRefClick = (e: any) => {
		const container = this.state.ref.current;
		const { target } = e;
		if (target !== container && !container.contains(target)) {
			this.setState({
				...this.state,
				currencySelectOpen: false,
				sideCartOpen: false,
			});
		}
	};

	componentDidUpdate = () => {
		if (this.state.currencySelectOpen) {
			document.body.addEventListener('click', this.outsideRefClick);
		} else {
			document.body.removeEventListener('click', this.outsideRefClick);
		}
		if (this.state.sideCartOpen) {
			document.body.addEventListener('click', this.outsideRefClick);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.removeEventListener('click', this.outsideRefClick);
			document.body.style.removeProperty('overflow');
		}
	};

	componentWillUnmount = () => {
		document.body.removeEventListener('click', this.outsideRefClick);
	};

	navigateToCart = () => {
		this.setState({
			...this.state,
			currencySelectOpen: false,
			sideCartOpen: false,
		});
		this.props.withRouter.navigate('/cart');
	};

	changeCurrency = (
		e: React.MouseEvent<HTMLDivElement>,
		currency: Currency
	) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			currencySelectOpen: false,
		});
		this.props.changeCurrency(currency);
	};

	roundNumber(value: number, decimals: number) {
		return Number(
			Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals
		).toFixed(decimals);
	}

	render() {
		const search = this.props.withRouter.location.search;
		const category = new URLSearchParams(search).get('category') || 'all';
		return (
			<>
				{this.state.sideCartOpen && <Blur />}
				<Nav>
					<div>
						{this.props.categoryList.map((c) => {
							return (
								<CategoryLink
									key={c.name}
									to={`/catalog${
										c.name !== 'all' ? `?category=${c.name}` : ''
									}`}
									className={`${c.name === category ? 'active' : ''}`}
								>
									{c.name}
								</CategoryLink>
							);
						})}
					</div>
					<Logo>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							xmlSpace='preserve'
							shapeRendering='geometricPrecision'
							textRendering='geometricPrecision'
							imageRendering='optimizeQuality'
							fillRule='evenodd'
							clipRule='evenodd'
							viewBox='0 0 2048 2048'
						>
							<g>
								<rect
									width='2048'
									height='2048'
									rx='256'
									ry='256'
									fill='#00c800'
								/>
								<g>
									<path
										className='fil1'
										d='M1601 765h28l5 28 158 688v182H256v-189l159-682 5-28h234c-17 64-28 130-31 192-1 28-4 58 15 81 13 15 31 22 50 22 46 0 65-33 67-74 0-8 0-16 1-24 4-63 17-132 37-197h461c24 75 38 155 38 228 0 37 30 67 67 67s67-30 67-67c0-74-11-152-32-228h209z'
									/>
									<path
										className='fil1'
										d='M688 1032c-39 0-34-41-32-67 6-102 35-232 88-340 58-120 146-215 261-225 16-1 30-1 46 1 90 12 169 85 229 185 69 116 112 272 112 412 0 18-15 33-33 33s-33-15-33-33c0-128-40-271-103-378-48-80-108-139-172-152-14-3-30-3-44-2-86 9-154 88-202 187s-76 218-81 312c-1 25 5 66-34 66z'
									/>
								</g>
							</g>
						</svg>
					</Logo>
					<NavControls ref={this.state.ref}>
						<CurrencySelect
							onClick={(e) => this.toggleCurrencySelectorVisibility(e)}
						>
							<div className='currency-icon'>
								<h3>{this.props.selectedCurrency.symbol}</h3>
								<svg
									width='24px'
									height='24px'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									style={{
										transform: this.state.currencySelectOpen
											? 'rotateX(180deg)'
											: '',
									}}
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z'
										fill='#000000'
									/>
								</svg>
							</div>
							<div className='currency-item-list'>
								{this.state.currencySelectOpen &&
									this.props.currencyList.map((currency) => (
										<CurrencyItem
											key={currency.label}
											onClick={(e) => this.changeCurrency(e, currency)}
											className={`${
												currency.label === this.props.selectedCurrency.label
													? 'selected'
													: ''
											}`}
										>
											{currency.label}
											{currency.symbol}
										</CurrencyItem>
									))}
							</div>
						</CurrencySelect>
						<SideCart>
							<div onClick={(e) => this.toggleSideCartVisibility(e)}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path
										fill='#000000'
										d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
										data-name='Shopping Cart'
									/>
								</svg>
								<CartItemCount>
									{this.props.cart.reduce(
										(total, item) => total + item.count,
										0
									)}
								</CartItemCount>
							</div>
							{this.state.sideCartOpen && (
								<div className='side-cart-contents'>
									<Header>
										<h4>My Bag</h4>
										{this.props.cart.reduce(
											(total, item) => total + item.count,
											0
										)}{' '}
										items
									</Header>
									<ul className='side-cart-item-list'>
										{this.props.cart.map((item, i) => (
											<SideCartProductCard
												key={i}
												item={item}
												currency={this.props.selectedCurrency}
											/>
										))}
									</ul>
									<Footer>
										<Total>
											<span>Total</span>
											<span>
												{this.props.selectedCurrency.symbol}
												{this.roundNumber(
													this.props.cart.reduce(
														(total, item) =>
															total +
															item.count *
																item.prices.find(
																	(p) =>
																		p.currency.label ===
																		this.props.selectedCurrency.label
																)!.amount,
														0
													),
													2
												)}
											</span>
										</Total>
										<div className='side-cart-controls'>
											<Button
												bgColor='#ffffff'
												color='#000000'
												border='#000000'
												click={this.navigateToCart}
											>
												View Bag
											</Button>
											<Button
												bgColor='#00c800'
												color='#ffffff'
												click={this.navigateToCart}
											>
												Check Out
											</Button>
										</div>
									</Footer>
								</div>
							)}
						</SideCart>
					</NavControls>
				</Nav>
			</>
		);
	}
}

export default withRouter(Navbar);
