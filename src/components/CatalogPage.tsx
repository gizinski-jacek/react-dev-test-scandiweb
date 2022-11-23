import { Component } from 'react';
import * as styled from '../styled/CatalogPage.styled';
import { client } from '../apollo/client';
import { GET_CATEGORY_PRODUCTS } from '../apollo/queries';
import withRouter from '../HOC/withRouter';
import {
	CartProduct,
	Currency,
	GQLCategoryData,
	WithRouter,
} from '../types/types';
import productToCartProduct from '../utils/productToCartProduct';
import PLPProductCard from '../wrappers/PLPProductCard';
import LoadingSpinner from '../reusables/LoadingSpinner';

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
}

interface State {
	category: string;
	productList: CartProduct[] | null;
	loading: boolean;
}

class CatalogPage extends Component<Props> {
	state: State = {
		category: '',
		productList: [],
		loading: true,
	};

	componentDidMount = async () => {
		try {
			const { category } = this.props.withRouter.params;
			const response: GQLCategoryData = await client.query({
				query: GET_CATEGORY_PRODUCTS,
				variables: { category: category },
			});
			if (!response.data.category) {
				this.setState({
					...this.state,
					category: 'invalid category',
					productList: null,
					loading: false,
				});
			} else {
				const cartProducts = response.data.category.products.map((product) =>
					productToCartProduct(product)
				);
				this.setState({
					...this.state,
					category: response.data.category.name,
					productList: cartProducts,
					loading: false,
				});
			}
		} catch (error) {
			this.setState({
				...this.state,
				loading: false,
			});
			console.log(error);
		}
	};

	componentDidUpdate = async (prevProps: Props, prevState: State) => {
		try {
			const { category } = this.props.withRouter.params;
			if (category !== prevState.category) {
				const response: GQLCategoryData = await client.query({
					query: GET_CATEGORY_PRODUCTS,
					variables: { category: category },
				});
				if (!response.data.category) {
					this.setState({
						...this.state,
						category: 'invalid category',
						productList: null,
						loading: false,
					});
				} else {
					const cartProducts = response.data.category.products.map((product) =>
						productToCartProduct(product)
					);
					this.setState({
						...this.state,
						category: response.data.category.name,
						productList: cartProducts,
						loading: false,
					});
				}
			}
		} catch (error) {
			this.setState({
				...this.state,
				loading: false,
			});
			console.log(error);
		}
	};

	render() {
		return this.state.loading ? (
			<LoadingSpinner />
		) : (
			<styled.Catalog>
				<h2>{this.state.category}</h2>
				{this.state.productList && (
					<styled.Grid>
						{this.state.productList.map((product, i) => (
							<PLPProductCard key={i} product={product} />
						))}
					</styled.Grid>
				)}
			</styled.Catalog>
		);
	}
}

export default withRouter(CatalogPage);
