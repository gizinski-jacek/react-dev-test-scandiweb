import { Component } from 'react';
import styled from 'styled-components';
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

const Catalog = styled.div`
	h2 {
		margin: 5rem 1rem;
		text-transform: capitalize;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 280px);
	grid-gap: 4rem;
	justify-content: center;
`;

interface Props {
	withRouter: WithRouter;
	selectedCurrency: Currency;
}

interface State {
	category: string;
	productList: CartProduct[];
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
			const cartProducts = response.data.category.products.map((product) =>
				productToCartProduct(product)
			);
			this.setState({
				...this.state,
				category: response.data.category.name,
				productList: cartProducts,
			});
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

	render() {
		const search = this.props.withRouter.location.search;
		const category = new URLSearchParams(search).get('category');
		return (
			<Catalog>
				<h2>{category === 'all' ? 'all products' : category}</h2>
				<Grid>
					{this.state.productList.map((product, i) => (
						<PLPProductCard
							key={i}
							product={product}
							selectedCurrency={this.props.selectedCurrency}
						/>
					))}
				</Grid>
			</Catalog>
		);
	}
}

export default withRouter(CatalogPage);
