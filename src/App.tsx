import { Component } from 'react';
import './App.css';
import { Category, Currency, GQLInitialData } from './types/types';
import { Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import { GET_INITIAL_DATA } from './apollo/queries';
import { client } from './apollo/client';

interface State {
	categoryList: Category[];
	selectedCurrency: Currency;
	currencyList: Currency[];
	loading: boolean;
}

class App extends Component {
	state: State = {
		categoryList: [],
		selectedCurrency: { label: 'USD', symbol: '$' },
		currencyList: [],
		loading: true,
	};

	componentDidMount = async () => {
		try {
			const initialData: GQLInitialData = await client.query({
				query: GET_INITIAL_DATA,
			});
			this.setState({
				...this.state,
				categoryList: initialData.data.categories,
				currencyList: initialData.data.currencies,
				loading: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	changeCurrency = (currency: Currency) => {
		this.setState({ ...this.state, selectedCurrency: currency });
	};

	render() {
		return (
			!this.state.loading && (
				<>
					<Navbar
						categoryList={this.state.categoryList}
						changeCurrency={this.changeCurrency}
						currencyList={this.state.currencyList}
						selectedCurrency={this.state.selectedCurrency}
					/>
					<main>
						<Routes>
							<Route
								path='/catalog'
								element={
									<CatalogPage selectedCurrency={this.state.selectedCurrency} />
								}
							/>
							<Route
								path='/product/:id'
								element={
									<ProductPage selectedCurrency={this.state.selectedCurrency} />
								}
							/>
							<Route
								path='/cart'
								element={
									<CartPage selectedCurrency={this.state.selectedCurrency} />
								}
							/>
							<Route path='/*' element={<Navigate to='/catalog' />} />
						</Routes>
					</main>
				</>
			)
		);
	}
}

export default App;
