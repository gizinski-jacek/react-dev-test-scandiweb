import styled from 'styled-components';

export const Product = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	gap: 2rem;

	@media only screen and (min-width: 768px) {
		flex-direction: row;
	}
`;

export const Gallery = styled.div`
	display: flex;
	gap: 2rem;
	max-height: 420px;
	width: fit-content;
`;

export const Thumbnails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	overflow-y: scroll;
	padding-left: 1rem;
	direction: rtl;
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 240px;

	span {
		display: block;
		font-weight: 600;
	}
`;

export const Name = styled.div`
	h3 {
		margin: 0;
		margin-bottom: 0.5rem;

		&:first-child {
			font-weight: 600;
		}
	}
`;

export const Price = styled.div`
	font-weight: 600;
`;

export const H2 = styled.h2`
	text-align: center;
	margin: 5rem 0;
`;
