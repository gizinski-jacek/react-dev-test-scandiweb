import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

class Layout extends Component {
	render() {
		return (
			<>
				<Navbar />
				<main>
					<Outlet />
				</main>
			</>
		);
	}
}

export default Layout;
