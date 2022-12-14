import styled from 'styled-components';

export const Page = styled.div`
	h2 {
		margin: 0 1rem;
		text-transform: uppercase;
		font-weight: 800;
	}
`;

export const ProductList = styled.ul`
	margin-top: 4rem;

	li {
		padding: 1rem 0;
		border: 0 solid #00000010;
		border-width: 0 0 2px 0;

		&:first-child {
			border-top-width: 2px;
		}
	}
`;

export const Footer = styled.div`
	padding: 1rem;
`;

export const Details = styled.div`
	display: flex;
	gap: 1rem;

	> div:nth-child(2) {
		font-weight: 600;
	}
`;
