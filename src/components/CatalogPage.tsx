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

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
}

interface State {
	category: string;
	productList: CartProduct[] | null;
}

class CatalogPage extends Component<Props> {
	state: State = {
		category:
			new URLSearchParams(this.props.withRouter.location.search).get(
				'category'
			) || 'all',
		productList: [],
	};

	componentDidMount = async () => {
		try {
			const search = this.props.withRouter.location.search;
			const category = new URLSearchParams(search).get('category') || 'all';
			const response: GQLCategoryData = await client.query({
				query: GET_CATEGORY_PRODUCTS,
				variables: { category: category },
			});
			if (!response.data.category) {
				this.setState({
					...this.state,
					category: 'invalid category',
					productList: null,
				});
			} else {
				const cartProducts = response.data.category.products.map((product) =>
					productToCartProduct(product)
				);
				this.setState({
					...this.state,
					category: response.data.category.name,
					productList: cartProducts,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate = async (prevProps: Props, prevState: State) => {
		try {
			const search = this.props.withRouter.location.search;
			const category = new URLSearchParams(search).get('category') || 'all';
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
					});
				} else {
					const cartProducts = response.data.category.products.map((product) =>
						productToCartProduct(product)
					);
					this.setState({
						...this.state,
						category: response.data.category.name,
						productList: cartProducts,
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<styled.Catalog>
				<h2>
					{this.state.category === 'all' ? 'all products' : this.state.category}
				</h2>
				{this.state.productList && (
					<styled.Grid>
						{this.state.productList.map((product, i) => (
							<PLPProductCard
								key={i}
								product={product}
								selectedCurrency={this.props.selectedCurrency}
							/>
						))}
					</styled.Grid>
				)}
			</styled.Catalog>
		);
	}
}

export default withRouter(CatalogPage);
