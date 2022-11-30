import styled from 'styled-components';

export const Cart = styled.div`
	position: relative;
	width: 40px;
	cursor: pointer;
`;

export const Contents = styled.div`
	width: 320px;
	max-height: 75vh;
	cursor: initial;
	position: absolute;
	padding: 1rem 0;
	right: 0;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	z-index: 10;
	box-shadow: 0 0 0.25rem 0 #ffffff;
`;

export const ProductList = styled.ul`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: scroll;
`;

export const CartProductCount = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
	padding: 2px;
	text-align: center;
	color: #ffffff;
	background-color: #000000;
	border-radius: 50%;
	font-weight: 500;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	margin: 0.5rem;
	cursor: initial;

	h4 {
		margin: 0.5rem;
		font-weight: 600;
	}
`;

export const Footer = styled.div`
	padding: 1rem;
	position: sticky;
	bottom: 0;
	background-color: #ffffff;
`;

export const Controls = styled.div`
	display: flex;
	gap: 1rem;

	button {
		flex: 1;
	}
`;

export const Total = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem 0;
	font-size: 1.25rem;
	font-weight: 600;
`;
