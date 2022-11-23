import styled from 'styled-components';

export const Catalog = styled.div`
	h2 {
		margin: 0 1rem;
		margin-bottom: 4rem;
		text-transform: uppercase;
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 320px);
	grid-gap: 5rem;
	justify-content: center;
`;
