import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
	padding: 1rem 4rem;
	padding-bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	background-color: #ffffff;
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
	flex: 1;
`;

export const CategoryLink = styled(NavLink)<{ $active: boolean }>`
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

	${({ $active }) =>
		$active &&
		`
		border-bottom: 2px solid #00c800;
		color: #00c800 !important;
  `}
`;

export const Logo = styled.div`
	width: 40px;
	height: 40px;
	min-width: 40px;
	min-height: 40px;
	fill: #ffffff;
`;

export const NavControls = styled.div`
	display: flex;
	flex: 1;
	justify-content: flex-end;
`;

export const CurrencySelect = styled.div`
	position: relative;
	cursor: pointer;
	z-index: 10;
	margin: auto 0;
`;

export const CurrencySymbol = styled.div<{ $rotate?: boolean }>`
	display: flex;

	span {
		font-size: 1.5rem;
		min-width: 32px;
		text-align: end;
	}

	${({ $rotate }) =>
		$rotate &&
		`
		svg {
			transform: rotateX(180deg);
		}
  `}
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
