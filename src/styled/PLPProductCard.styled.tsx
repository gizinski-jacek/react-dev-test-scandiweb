import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	transition: 0.15s ease-in-out;
	text-decoration: none;
	color: #000000;
	position: relative;

	&:hover {
		box-shadow: 0 0 1rem 0.25rem #dadada;

		div {
			opacity: 1;
		}
	}
`;

export const Img = styled.div`
	margin: auto;
`;

export const CardLink = styled(Link)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	z-index: 1;
`;

export const CartIcon = styled.div`
	opacity: 0;
	display: block;
	position: absolute;
	right: 8px;
	bottom: -16px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #00c800;
	transition: 0.15s ease-in-out;
	cursor: pointer;
	z-index: 3;

	&:hover {
		transform: scale(1.25);
	}

	&:active {
		filter: brightness(110%);
	}
`;

export const Details = styled.div`
	flex: 1;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
