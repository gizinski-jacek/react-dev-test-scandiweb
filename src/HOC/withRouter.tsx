import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const withRouter = (WrappedComponent: any) => (props: any) => {
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const history = createBrowserHistory();

	return (
		<WrappedComponent
			{...props}
			withRouter={{
				location: location,
				navigate: navigate,
				params: params,
				history: history,
			}}
		/>
	);
};

export default withRouter;
