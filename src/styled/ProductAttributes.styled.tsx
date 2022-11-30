import styled from 'styled-components';

export const Container = styled.div<{ bigger?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	${({ bigger }) =>
		bigger &&
		`
		span {
			font-size: 1.25rem;
		}`};
`;

export const Attributes = styled.div`
	> div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
`;

export const Color = styled.div<{
	selected: boolean;
	bgColor: string;
	bigger?: boolean;
}>`
	width: ${({ bigger }) => (bigger ? '24px' : '16px')};
	height: ${({ bigger }) => (bigger ? '24px' : '16px')};
	border: 1px solid #a1a1a1;
	cursor: pointer;
	position: relative;
	background-color: ${({ bgColor }) => bgColor || '#000000'};

	${({ selected }) =>
		selected &&
		`
		&:before {
		border: 2px solid #64ff00;
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
	}
  `}
`;

export const OtherAtt = styled.div<{
	cursor?: boolean;
	selected: boolean;
	bigger?: boolean;
}>`
	width: ${({ bigger }) => (bigger ? '52px' : '24px')};
	display: inline-flex;
	justify-content: center;
	padding: ${({ bigger }) => (bigger ? '0.75rem 1rem' : '0.25rem 0.5rem')};
	border: 1px solid #000000;
	position: relative;

	${({ cursor }) =>
		cursor &&
		`
		cursor: pointer;
		transition: 0.1s ease-in-out;

		&:hover {
			box-shadow: 0 0 1px 1px #960096;
			border-color: #960096;
		}

		&:active {
			box-shadow: 0 0 2px 2px #960096;
			border-color: #960096;
		}
  `}

	${({ selected }) =>
		selected &&
		`
		background-color: #000000;
		color: #ffffff;

		&:hover {
			border: 1px solid #000000;
			box-shadow: none;
		}

		&:active {
			border: 1px solid #000000;
			box-shadow: none;
		}
  `}
`;
