import { Component } from 'react';
import styled from 'styled-components';

const Btn = styled.button<{
	border?: string;
	bgColor?: string;
	color?: string;
	margin?: string;
	minWidth?: string;
}>`
	display: block;
	border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
	color: ${({ color }) => color || '#ffffff'};
	margin: ${({ margin }) => margin || '0'};
	background-color: ${({ bgColor }) => bgColor || '#000000'};
	min-width: ${({ minWidth }) => minWidth || 'initial'};
	padding: 0.5rem;
	font-size: 1.1rem;
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	transition: 0.1s ease-in-out;
	text-transform: uppercase;

	&:hover {
		filter: brightness(110%);
	}

	&:active {
		filter: brightness(120%);
	}

	&:disabled {
		opacity: 0.25;
		cursor: initial;
		filter: none;
	}
`;

interface Props {
	children?: string;
	border?: string;
	bgColor?: string;
	color?: string;
	margin?: string;
	minWidth?: string;
	disabled?: boolean;
	onClick: (...any: any) => void;
}

class Button extends Component<Props> {
	render() {
		return (
			<Btn {...this.props} type='button'>
				{this.props.children ?? 'Button'}
			</Btn>
		);
	}
}

export default Button;
