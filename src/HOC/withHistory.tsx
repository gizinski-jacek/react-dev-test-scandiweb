import { createBrowserHistory } from 'history';

const withHistory = (WrappedComponent: any) => (props: any) => {
	const history = createBrowserHistory();

	return <WrappedComponent {...props} history={history} />;
};

export default withHistory;
