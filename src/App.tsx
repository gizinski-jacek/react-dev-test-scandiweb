import { Component } from 'react';
import { connect } from 'react-redux';
import {
	addItem,
	removeItem,
	incrementItem,
	decrementItem,
} from './features/cartSlice';
import './App.css';
import { client } from '.';
import { gql } from '@apollo/client';
import { CartProduct, Currency, Product } from './types/types';
import ProductCard from './wrappers/ProductCard';
import styled from 'styled-components';
import { AppDispatch, RootState } from './app/store';
import withParams from './HOC/withParams';
import { Routes, Route, Params, Navigate } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import withHistory from './HOC/withHistory';
import { BrowserHistory } from 'history';
import Button from './reusables/Button';

const Main = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const Nav = styled.nav`
	margin: 1rem 4rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const CategoryItem = styled.li`
	display: inline-block;
	padding: 1rem;
	text-transform: uppercase;

	&.active {
		border-bottom: 2px solid #00c800;
	}
`;

const MainCartLink = styled.a`
	width: 40px;
	height: 40px;
	fill: #ffffff;
	cursor: pointer;
`;

const NavControls = styled.div`
	display: flex;

	> div {
		margin-left: 1rem;
	}
`;

const CurrencySelect = styled.div`
	width: 20px;
	position: relative;
	cursor: pointer;

	
	}

	.currency-item-list {
		position: absolute;
		top: 100%;
		left: 0;
		height: 0;
		overflow: hidden;
	}

	.currency-item-list.open {
		height: fit-content;
	}
`;

const SideCart = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
	cursor: pointer;

	.side-cart {
		width: 0;
		height: 0;
		position: absolute;
		top: 100%;
		right: 0;
		height: 0;
		overflow: hidden;
	}

	.side-cart.open {
		width: 240px;
		height: fit-content;
	}

	.side-cart-controls {
		display: flex;
	}
`;

const CartCount = styled.div`
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

interface State {
	selectedCategory: string;
	categoryList: string[];
	productList: Product[];
	currencyList: Currency[];
	currencySelectOpen: boolean;
	selectedCurrency: Currency;
	cart: CartProduct[];
	sideCartOpen: boolean;
}

interface InitialData {
	data: {
		categories: string[];
		currencies: Currency[];
		category: { products: Product[] };
	};
}

interface Props {
	params: Readonly<Params<string>>;
	history: BrowserHistory;
	cart: CartProduct[];
	addItem: (product: Product) => void;
	removeItem: (product: Product) => void;
	incrementItem: (product: Product) => void;
	decrementItem: (product: Product) => void;
}

class App extends Component<Props> {
	state: State = {
		selectedCategory: 'all',
		categoryList: [],
		productList: [],
		currencyList: [],
		currencySelectOpen: false,
		selectedCurrency: { label: 'USD', symbol: '$' },
		cart: this.props.cart,
		sideCartOpen: false,
	};

	async componentDidMount() {
		const initialData: InitialData = await client.query({
			query: GET_INITIAL_DATA,
			variables: { category: this.state.selectedCategory },
		});
		this.setState({
			...this.state,
			categoryList: initialData.data.categories,
			currencyList: initialData.data.currencies,
			productList: initialData.data.category.products,
		});
	}

	async changeCategory(category: string) {
		const response = await client.query({
			query: GET_PRODUCTS,
			variables: { category: category },
		});
		this.setState({
			...this.state,
			selectedCategory: response.data.category.name,
			productList: response.data.category.products,
		});
	}

	changeCurrency(e: any, currency: Currency) {
		e.stopPropagation();
		this.setState({ ...this.state, selectedCurrency: currency });
	}

	toggleCurrencySelectorVisibility() {
		this.setState({
			...this.state,
			currencySelectOpen: !this.state.currencySelectOpen,
			sideCartOpen: false,
		});
	}

	toggleSideCartVisibility() {
		this.setState({
			...this.state,
			sideCartOpen: !this.state.sideCartOpen,
			currencySelectOpen: false,
		});
	}

	render() {
		return (
			<Routes>
				<Route path='/' element={<Navigate to='/catalog' />} />
				<Route
					path='/catalog'
					element={
						<>
							<Nav>
								<ul className='category-list'>
									{this.state.categoryList.map((category: any) => {
										return (
											<CategoryItem
												key={category.name}
												onClick={() => this.changeCategory(category.name)}
												className={
													this.state.selectedCategory === category.name
														? 'active'
														: ''
												}
											>
												{category.name}
											</CategoryItem>
										);
									})}
								</ul>
								<MainCartLink href='/cart'>
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
								</MainCartLink>
								<NavControls>
									<CurrencySelect
										onClick={() => this.toggleCurrencySelectorVisibility()}
									>
										<div className='icon'>
											<h3>{this.state.selectedCurrency.symbol}</h3>
										</div>
										<div
											className={`currency-item-list ${
												this.state.currencySelectOpen ? 'open' : ''
											}`}
										>
											{this.state.currencyList.map((currency) => (
												<div
													key={currency.label}
													onClick={(e) => this.changeCurrency(e, currency)}
												>
													{currency.label}
													{currency.symbol}
												</div>
											))}
										</div>
									</CurrencySelect>
									<SideCart onClick={() => this.toggleSideCartVisibility()}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 512 512'
										>
											<path
												fill='#000000'
												d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
												data-name='Shopping Cart'
											/>
										</svg>
										<CartCount>
											{this.props.cart.reduce(
												(total, item) => total + item.count,
												0
											)}
										</CartCount>
										<div
											className={`side-cart ${
												this.state.sideCartOpen ? 'open' : ''
											}`}
										>
											<ul
												className={`side-cart-item-list ${
													this.state.sideCartOpen ? 'open' : ''
												}`}
											>
												{this.props.cart.map((item, i) => (
													<li key={i}>
														{item.name} {item.count}
													</li>
												))}
											</ul>
											<div className='side-cart-controls'>
												<Button border>View Bag</Button>
												<Button bgColor='#00c800' color='#ffffff'>
													Check Out
												</Button>
											</div>
										</div>
									</SideCart>
								</NavControls>
							</Nav>
							<Main>
								{this.state.productList.map((product, i) => (
									<ProductCard
										key={i}
										product={product}
										selectedCurrency={this.state.selectedCurrency}
										addItem={this.props.addItem}
									/>
								))}
							</Main>
						</>
					}
				/>
				<Route path='/product/:id' element={<ProductPage />}></Route>
				<Route path='/cart' element={<CartPage />}></Route>
			</Routes>
		);
	}
}

const GET_INITIAL_DATA = gql`
	query ($category: String!) {
		categories {
			name
		}
		currencies {
			label
			symbol
		}
		category(input: { title: $category }) {
			name
			products {
				id
				name
				inStock
				gallery
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

const GET_PRODUCTS = gql`
	query ($category: String!) {
		category(input: { title: $category }) {
			name
			products {
				id
				name
				inStock
				gallery
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

function mapStateToProps(state: RootState) {
	return { cart: state.cart };
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		addItem: (product: Product) => dispatch(addItem(product)),
		removeItem: (product: Product) => dispatch(removeItem(product)),
		incrementItem: (product: Product) => dispatch(incrementItem(product)),
		decrementItem: (product: Product) => dispatch(decrementItem(product)),
	};
}

export default withHistory(
	withParams(connect(mapStateToProps, mapDispatchToProps)(App))
);
