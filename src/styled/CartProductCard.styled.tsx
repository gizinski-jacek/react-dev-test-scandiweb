import styled from 'styled-components';

export const Product = styled.li<{ bigger?: boolean }>`
	display: flex;
	gap: ${({ bigger }) => (bigger ? '1rem' : '0.5rem')};
	margin: 1rem;
`;

export const Details = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: auto;
	gap: 2rem;

	> button {
		white-space: nowrap;
	}
`;

export const Info = styled.div<{ bigger?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-right: auto;

	h3,
	h4 {
		font-weight: 500;

		&:nth-child(2) {
			font-weight: 300;
		}
	}

	${({ bigger }) =>
		!bigger &&
		`
		h3, h4 {
			margin: 0;
			font-weight: 400;

			&:nth-child(3) {
			font-weight: 500;
		}
  `}
`;

export const ProductCounter = styled.div`
	display: flex;
	flex-direction: column;

	span {
		margin: auto;
		font-weight: 600;
	}
`;

export const DecBtn = styled.div<{ bigger?: boolean }>`
	width: ${({ bigger }) => (bigger ? '32px' : '24px')};
	height: ${({ bigger }) => (bigger ? '32px' : '24px')};
	border: 1px solid #000000;
	cursor: pointer;
	font-size: 1.25rem;
	position: relative;
	transition: 0.1s ease-in-out;

	&:hover {
		box-shadow: 0 0 1px 1px #960096;
		border-color: #960096;
	}

	&:active {
		box-shadow: 0 0 2px 2px #960096;
		border-color: #960096;
	}

	&:before {
		content: '';
		display: block;
		width: 12px;
		height: 2px;
		background-color: #000000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
`;

export const IncBtn = styled(DecBtn)`
	&:after {
		content: '';
		display: block;
		width: 2px;
		height: 12px;
		background-color: #000000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
`;

export const GalleryWrapper = styled.div<{ width?: string; height?: string }>`
	width: ${({ width }) => width || '120px'};
	height: ${({ height }) => height || '160px'};
	position: relative;
`;

export const Arrows = styled.div`
	display: flex;
	gap: 0.5rem;
	margin: 0.5rem;
	position: absolute;
	bottom: 0;
	right: 0;
`;

export const ArrowPrev = styled.div`
	width: 20px;
	height: 20px;
	background-color: #000000;
	cursor: pointer;
	font-size: 1.25rem;
	position: relative;
	opacity: 0.75;
	transition: 0.1s ease-in-out;

	&:before {
		content: '';
		display: block;
		width: 8px;
		height: 2px;
		background-color: #ffffff;
		position: absolute;
		top: 5px;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform: rotate(45deg);
	}

	&:after {
		content: '';
		display: block;
		width: 2px;
		height: 8px;
		background-color: #ffffff;
		position: absolute;
		top: -5px;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform: rotate(45deg);
	}

	&:hover {
		opacity: 1;
		box-shadow: 0 0 1px 1px #960096;
		border-color: #960096;
	}

	&:active {
		box-shadow: 0 0 2px 2px #960096;
		border-color: #960096;
	}
`;

export const ArrowNext = styled(ArrowPrev)`
	transform: rotateY(180deg);
`;
