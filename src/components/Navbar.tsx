import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import withRouter from '../HOC/withRouter';
import {
	CartProductWithUID,
	Category,
	Currency,
	WithRouter,
} from '../types/types';
import SideCart from './SideCart';

const Nav = styled.nav`
	padding: 1rem 4rem;
	height: 5rem;
	display: flex;
	justify-content: space-between;
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

const CategoryList = styled.div`
	display: flex;
`;

const CategoryLink = styled(NavLink)<{ active: string }>`
	display: inline-block;
	padding: 1rem;
	text-transform: uppercase;
	text-decoration: none;
	flex-wrap: nowrap;
	color: #000000;
	transition: 0.1s ease-in-out;

	&:hover {
		color: #00c800;
	}

	${({ active }) =>
		active === 'true' &&
		`
		border-bottom: 2px solid #00c800;
		color: #00c800;
  `}
`;

const Logo = styled.div`
	width: 40px;
	height: 40px;
	min-width: 40px;
	min-height: 40px;
	fill: #ffffff;
	margin: 0 1rem;
`;

const NavControls = styled.div`
	display: flex;
	gap: 1rem;
`;

const CurrencySelect = styled.div`
	position: relative;
	cursor: pointer;
	z-index: 10;

	h3 {
		min-width: 28px;
		text-align: end;
	}

	.currency-icon {
		display: flex;
		align-items: center;
	}

	.currency-item-list {
		position: absolute;
		left: 0;
		box-shadow: 0 0 0.5rem 0 #dadada;
	}
`;

const CurrencyItem = styled.div<{ selected: boolean }>`
	padding: 0.75rem 1.25rem;
	white-space: nowrap;
	background-color: ${({ selected }) => (selected ? '#dadada' : '#ffffff')};

	&:hover {
		filter: brightness(95%);
	}
`;

interface State {
	currencySelectOpen: boolean;
	sideCartOpen: boolean;
	ref: any;
}

interface Props {
	cart: CartProductWithUID[];
	withRouter: WithRouter;
	categoryList: Category[];
	changeCurrency: (currency: Currency) => void;
	currencyList: Currency[];
	selectedCurrency: Currency;
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

	navigateToCart = () => {
		this.setState({
			...this.state,
			currencySelectOpen: false,
			sideCartOpen: false,
		});
		this.props.withRouter.navigate('/cart');
	};

	render() {
		const search = this.props.withRouter.location.search;
		const category = new URLSearchParams(search).get('category');
		return (
			<>
				{this.state.sideCartOpen && <Blur />}
				<Nav>
					<CategoryList>
						{this.props.categoryList.map((c) => {
							return (
								<CategoryLink
									key={c.name}
									to={`/catalog${`?category=${c.name}`}`}
									active={(category === c.name).toString()}
								>
									{c.name}
								</CategoryLink>
							);
						})}
					</CategoryList>
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
						<CurrencySelect onClick={this.toggleCurrencySelectorVisibility}>
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
											selected={
												currency.label === this.props.selectedCurrency.label
											}
										>
											{currency.symbol} {currency.label}
										</CurrencyItem>
									))}
							</div>
						</CurrencySelect>
						<SideCart
							cart={this.props.cart}
							open={this.state.sideCartOpen}
							toggle={this.toggleSideCartVisibility}
							selectedCurrency={this.props.selectedCurrency}
							navigateToCart={this.navigateToCart}
						/>
					</NavControls>
				</Nav>
			</>
		);
	}
}

function mapStateToProps(state: RootState) {
	return { cart: state.cart };
}

export default withRouter(connect(mapStateToProps, null)(Navbar));
