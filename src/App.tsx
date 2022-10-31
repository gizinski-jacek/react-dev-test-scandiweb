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
import { Currency, Product } from './types/types';
import ProductCard from './wrappers/ProductCard';
import styled from 'styled-components';
import { AppDispatch, RootState } from './app/store';

const Main = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const Nav = styled.nav`
	margin: 1rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const CategoryItem = styled.li`
	display: inline-block;
	padding: 1rem;
	text-transform: uppercase;
`;

const CartLink = styled.div`
	width: 40px;
	height: 40px;
	fill: #ffffff;
`;

const Controls = styled.div`
	display: flex;
`;

const CurrencyIcon = styled.div`
	cursor: pointer;

	.currency-item-list {
		height: 0;
		opacity: 0;
	}

	&: hover .currency-item-list {
		height: fit-content;
		opacity: 1;
	}
`;

const CartIcon = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
	cursor: pointer;
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
	cart: Product[];
	itemCount: number;
	selectedCategory: string;
	selectedCurrency: Currency;
	categoryList: string[];
	currencyList: Currency[];
	productList: Product[];
}

interface InitialData {
	data: {
		categories: string[];
		currencies: Currency[];
		category: { products: Product[] };
	};
}

class App extends Component {
	state: State = {
		cart: [],
		itemCount: 0,
		selectedCategory: 'all',
		selectedCurrency: { label: 'USD', symbol: '$' },
		categoryList: [],
		currencyList: [],
		productList: [],
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

	// componentDidUpdate() {}

	// shouldComponentUpdate(nextProps, nextState) {}

	// componentDidUpdate(prevProps, prevState) {}

	// componentWillUnmount() {}

	async changeCategory(category: string) {
		const products = await client.query({
			query: GET_PRODUCTS,
			variables: { category: category },
		});
		this.setState({
			...this.state,
			selectedCategory: category,
			products: products.data.products,
		});
	}

	async changeCurrency(currency: Currency) {
		this.setState({ ...this.state, selectedCurrency: currency });
	}

	render() {
		return (
			<div>
				<Nav>
					<ul className='category-list'>
						{this.state.categoryList.map((category: any) => {
							return (
								<CategoryItem
									key={category.name}
									onClick={() => this.changeCategory(category.name)}
								>
									{category.name}
								</CategoryItem>
							);
						})}
					</ul>
					<CartLink>
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
					</CartLink>
					<Controls>
						<CurrencyIcon>
							<h3>{this.state.selectedCurrency.symbol}</h3>
							<div className='currency-item-list'>
								{this.state.currencyList.map((currency) => (
									<div
										key={currency.label}
										onClick={() => this.changeCurrency(currency)}
									>
										{currency.label}
										{currency.symbol}
									</div>
								))}
							</div>
						</CurrencyIcon>
						<CartIcon>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
								<path
									fill='#000000'
									d='M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z'
									data-name='Shopping Cart'
								/>
							</svg>
							<CartCount>{this.state.itemCount}</CartCount>
							<div className='cart-item-list'>
								{this.state.cart.map((item, i) => (
									<div key={i}>ITEM</div>
								))}
							</div>
						</CartIcon>
					</Controls>
				</Nav>
				<Main>
					{this.state.productList.map((product, i) => (
						<ProductCard
							key={i}
							product={product}
							selectedCurrency={this.state.selectedCurrency}
							// addItem={this.props.addItem}
						/>
					))}
				</Main>
			</div>
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

export default connect(mapStateToProps, {
	addItem,
	removeItem,
	incrementItem,
	decrementItem,
})(App);
