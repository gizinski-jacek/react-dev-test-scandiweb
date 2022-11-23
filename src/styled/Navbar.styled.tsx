import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
	padding: 1rem 4rem;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	border-bottom: 1px solid #00000010;
	position: sticky;
	top: 0;
	z-index: 20;
`;

export const Blur = styled.div`
	background-color: #00000040;
	position: absolute;
	top: 5rem;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
`;

export const CategoryList = styled.div`
	display: flex;
`;

export const CategoryLink = styled(NavLink)<{ active: string }>`
	display: inline-block;
	padding: 1rem;
	text-transform: uppercase;
	text-decoration: none;
	flex-wrap: nowrap;
	color: #000000;
	border-bottom: 2px solid #00000000;
	transition: 0.1s ease-in-out;
	font-size: 1.25rem;

	&:hover {
		text-decoration: none;
		color: #00c800;
	}

	${({ active }) =>
		active === 'true' &&
		`
		border-bottom: 2px solid #00c800;
		color: #00c800 !important;
  `}
`;

export const Logo = styled.div`
	width: 40px;
	height: 40px;
	fill: #ffffff;
	margin: 0 1rem;
`;

export const NavControls = styled.div`
	display: flex;
`;

export const CurrencySelect = styled.div`
	position: relative;
	cursor: pointer;
	z-index: 10;
	margin: auto;

	span {
		font-size: 1.5rem;
		min-width: 32px;
		text-align: end;
		margin: 0;
	}

	svg {
		margin-top: 0.5rem;
	}
`;

export const CurrencyIcon = styled.div`
	display: flex;
	align-items: center;
`;

export const CurrencyList = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	box-shadow: 0 0 0.5rem 0 #dadada;
`;

export const CurrencyItem = styled.div<{ selected: boolean }>`
	padding: 0.75rem 1.25rem;
	white-space: nowrap;
	background-color: ${({ selected }) => (selected ? '#dadada' : '#ffffff')};

	&:hover {
		filter: brightness(95%);
	}
`;
