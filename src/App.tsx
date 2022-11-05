import { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { client } from '.';
import { gql } from '@apollo/client';
import {
	CartProduct,
	Category,
	Currency,
	Product,
	WithRouter,
} from './types/types';
import PLPProductCard from './wrappers/PLPProductCard';
import styled from 'styled-components';
import { RootState } from './app/store';
import { Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import withRouter from './HOC/withRouter';

const Main = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

interface State {
	category: string;
	categoryList: Category[];
	productList: Product[];
	currency: Currency;
	currencyList: Currency[];
	cart: CartProduct[];
}

interface InitialData {
	data: {
		categories: Category[];
		currencies: Currency[];
		category: { products: Product[] };
	};
}

interface Props {
	withRouter: WithRouter;
	cart: CartProduct[];
}

class App extends Component<Props> {
	state: State = {
		category:
			new URLSearchParams(this.props.withRouter.location.search).get(
				'category'
			) || 'all',
		categoryList: [],
		productList: [],
		currency: { label: 'USD', symbol: '$' },
		currencyList: [],
		cart: this.props.cart,
	};

	componentDidMount = async () => {
		const search = this.props.withRouter.location.search;
		const category = new URLSearchParams(search).get('category') || 'all';
		const initialData: InitialData = await client.query({
			query: GET_INITIAL_DATA,
			variables: { category: category },
		});
		this.setState({
			...this.state,
			categoryList: initialData.data.categories,
			currencyList: initialData.data.currencies,
			productList: initialData.data.category.products,
		});
	};

	componentDidUpdate = async (prevProps: Props, prevState: State) => {
		const search = this.props.withRouter.location.search;
		const category = new URLSearchParams(search).get('category') || 'all';
		if (category !== prevState.category) {
			const response = await client.query({
				query: GET_PRODUCTS,
				variables: { category: category },
			});
			this.setState({
				...this.state,
				category: response.data.category.name,
				productList: response.data.category.products,
			});
		}
	};

	changeCurrency = (currency: Currency) => {
		this.setState({ ...this.state, currency: currency });
	};

	render() {
		return (
			<>
				<Navbar
					categoryList={this.state.categoryList}
					changeCurrency={this.changeCurrency}
					currencyList={this.state.currencyList}
					selectedCurrency={this.state.currency}
					cart={this.props.cart}
				/>
				<Routes>
					<Route path='/' element={<Navigate to='/catalog' />} />
					<Route
						path='/catalog'
						element={
							<Main>
								{this.state.productList.map((product, i) => (
									<PLPProductCard
										key={i}
										product={product}
										selectedCurrency={this.state.currency}
									/>
								))}
							</Main>
						}
					/>
					<Route path='/product/:id' element={<ProductPage />}></Route>
					<Route path='/cart' element={<CartPage />}></Route>
				</Routes>
			</>
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
				description
				category
				attributes {
					id
					name
					type
					items {
						displayValue
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				brand
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
				description
				category
				attributes {
					id
					name
					type
					items {
						displayValue
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				brand
			}
		}
	}
`;

function mapStateToProps(state: RootState) {
	return { cart: state.cart };
}

export default withRouter(connect(mapStateToProps, null)(App));
