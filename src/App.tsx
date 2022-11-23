import { Component } from 'react';
import './App.css';
import { Currency, GQLInitialData } from './types/types';
import { Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import Layout from './Layout';
import { GET_LISTS } from './apollo/queries';
import { client } from './apollo/client';
import { AppDispatch, RootState } from './redux/store';
import { changeCurrency } from './redux-slices/currencySlice';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ErrorMsg = styled.div`
	font-size: 2rem;
	text-align: center;
	text-transform: capitalize;
`;

interface State {
	loading: boolean;
	error: string | null;
}

class App extends Component<StateProps & StateDispatch> {
	state: State = {
		loading: true,
		error: null,
	};

	componentDidMount = async () => {
		try {
			if (!this.props.selectedCurrency) {
				const initialData: GQLInitialData = await client.query({
					query: GET_LISTS,
				});
				if (!initialData.data.currencies[0]) {
					throw new Error(
						'Default currency not set. Error fetching currencies from API.'
					);
				}
				this.props.changeCurrency(initialData.data.currencies[0]);
			}
			this.setState({
				...this.state,
				loading: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return this.state.loading ? null : this.state.error ? (
			<ErrorMsg>{this.state.error}</ErrorMsg>
		) : (
			<Routes>
				<Route element={<Layout />}>
					<Route path='/catalog/:category' element={<CatalogPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/*' element={<Navigate to='/catalog/all' />} />
				</Route>
			</Routes>
		);
	}
}

interface StateProps {
	selectedCurrency: Currency;
}

interface StateDispatch {
	changeCurrency: (currency: Currency | null) => void;
}

function mapStateToProps(state: RootState) {
	return { selectedCurrency: state.currency };
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		changeCurrency: (currency: Currency | null) =>
			dispatch(changeCurrency(currency)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
