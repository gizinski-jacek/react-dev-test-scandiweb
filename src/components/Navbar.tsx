import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import * as styled from '../styled/Navbar.styled';
import { AppDispatch, RootState } from '../redux/store';
import withRouter from '../HOC/withRouter';
import { Category, Currency, GQLInitialData, WithRouter } from '../types/types';
import SideCart from './SideCart';
import { changeCurrency } from '../redux-slices/currencySlice';
import { client } from '../apollo/client';
import { GET_LISTS } from '../apollo/queries';

interface State {
	categoryList: Category[];
	currencyList: Currency[];
	currencySelectOpen: boolean;
	sideCartOpen: boolean;
	ref: any;
}

class Navbar extends Component<StateProps & DispatchProps & OwnProps> {
	state: State = {
		categoryList: [],
		currencyList: [],
		currencySelectOpen: false,
		sideCartOpen: false,
		ref: createRef(),
	};

	toggleCurrencySelectorVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			currencySelectOpen: !this.state.currencySelectOpen,
			sideCartOpen: false,
		});
	};

	toggleSideCartVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			sideCartOpen: !this.state.sideCartOpen,
			currencySelectOpen: false,
		});
	};

	outsideRefClick = (e: any) => {
		const container = this.state.ref.current;
		const { target } = e;
		if (target !== container && !container.contains(target)) {
			this.setState({
				...this.state,
				currencySelectOpen: false,
				sideCartOpen: false,
			});
		}
	};

	componentDidMount = async () => {
		try {
			const initialData: GQLInitialData = await client.query({
				query: GET_LISTS,
			});
			this.setState({
				...this.state,
				categoryList: initialData.data.categories,
				currencyList: initialData.data.currencies,
			});
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate = () => {
		if (this.state.currencySelectOpen) {
			document.body.addEventListener('click', this.outsideRefClick);
		} else if (this.state.sideCartOpen) {
			document.body.addEventListener('click', this.outsideRefClick);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.removeEventListener('click', this.outsideRefClick);
			document.body.removeAttribute('style');
		}
	};

	componentWillUnmount = () => {
		document.body.removeEventListener('click', this.outsideRefClick);
	};

	changeCurrency = (
		e: React.MouseEvent<HTMLDivElement>,
		currency: Currency
	) => {
		e.stopPropagation();
		this.setState({
			...this.state,
			currencySelectOpen: false,
		});
		this.props.changeCurrency(currency);
	};

	navigateTo = (string: string) => {
		this.setState({
			...this.state,
			currencySelectOpen: false,
			sideCartOpen: false,
		});
		this.props.withRouter.navigate(string);
	};

	render() {
		const { category } = this.props.withRouter.params;
		return (
			<>
				{this.state.sideCartOpen && <styled.Blur />}
				<styled.Nav>
					<styled.CategoryList>
						{this.state.categoryList.map((c) => {
							return (
								<styled.CategoryLink
									key={c.name}
									to={`/catalog/${c.name}`}
									active={(category === c.name).toString()}
								>
									{c.name}
								</styled.CategoryLink>
							);
						})}
					</styled.CategoryList>
					<styled.Logo>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							xmlSpace='preserve'
							shapeRendering='geometricPrecision'
							textRendering='geometricPrecision'
							imageRendering='optimizeQuality'
							fillRule='evenodd'
							clipRule='evenodd'
							viewBox='0 0 2048 2048'
						>
							<g>
								<rect
									width='2048'
									height='2048'
									rx='256'
									ry='256'
									fill='#00c800'
								/>
								<g>
									<path
										className='fil1'
										d='M1601 765h28l5 28 158 688v182H256v-189l159-682 5-28h234c-17 64-28 130-31 192-1 28-4 58 15 81 13 15 31 22 50 22 46 0 65-33 67-74 0-8 0-16 1-24 4-63 17-132 37-197h461c24 75 38 155 38 228 0 37 30 67 67 67s67-30 67-67c0-74-11-152-32-228h209z'
									/>
									<path
										className='fil1'
										d='M688 1032c-39 0-34-41-32-67 6-102 35-232 88-340 58-120 146-215 261-225 16-1 30-1 46 1 90 12 169 85 229 185 69 116 112 272 112 412 0 18-15 33-33 33s-33-15-33-33c0-128-40-271-103-378-48-80-108-139-172-152-14-3-30-3-44-2-86 9-154 88-202 187s-76 218-81 312c-1 25 5 66-34 66z'
									/>
								</g>
							</g>
						</svg>
					</styled.Logo>
					<styled.NavControls ref={this.state.ref}>
						<styled.CurrencySelect
							onClick={this.toggleCurrencySelectorVisibility}
						>
							<styled.CurrencyIcon>
								<span>{this.props.selectedCurrency.symbol}</span>
								<svg
									width='24px'
									height='24px'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									style={{
										transform: this.state.currencySelectOpen
											? 'rotateX(180deg)'
											: '',
									}}
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z'
										fill='#000000'
									/>
								</svg>
							</styled.CurrencyIcon>
							<styled.CurrencyList>
								{this.state.currencySelectOpen &&
									this.state.currencyList.map((currency) => (
										<styled.CurrencyItem
											key={currency.label}
											onClick={(e) => this.changeCurrency(e, currency)}
											selected={
												currency.label === this.props.selectedCurrency.label
											}
										>
											{currency.symbol} {currency.label}
										</styled.CurrencyItem>
									))}
							</styled.CurrencyList>
						</styled.CurrencySelect>
						<SideCart
							open={this.state.sideCartOpen}
							toggle={this.toggleSideCartVisibility}
							navigateTo={this.navigateTo}
						/>
					</styled.NavControls>
				</styled.Nav>
			</>
		);
	}
}

interface StateProps {
	selectedCurrency: Currency;
}

interface OwnProps {
	withRouter: WithRouter;
}

interface DispatchProps {
	changeCurrency: (currency: Currency) => void;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
	return { selectedCurrency: state.currency, ...ownProps };
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		changeCurrency: (currency: Currency) => dispatch(changeCurrency(currency)),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
