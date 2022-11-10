import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as CartProvider } from 'react-redux';
import { store, persistor } from './redux/store';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { client } from './apollo/client';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<CartProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</CartProvider>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
