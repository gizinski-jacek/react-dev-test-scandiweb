import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Category, Currency } from './types/types';

interface NavbarProps {
	categoryList: Category[];
	changeCurrency: (currency: Currency) => void;
	currencyList: Currency[];
	selectedCurrency: Currency;
}

class Layout extends Component<NavbarProps> {
	render() {
		return (
			<>
				<Navbar {...this.props} />
				<main>
					<Outlet />
				</main>
			</>
		);
	}
}

export default Layout;
