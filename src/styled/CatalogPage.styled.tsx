import styled from 'styled-components';

export const Catalog = styled.div`
	h2 {
		margin: 0 1rem;
		margin-bottom: 4rem;
		text-transform: capitalize;
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 280px);
	grid-gap: 4rem;
	justify-content: center;
`;
