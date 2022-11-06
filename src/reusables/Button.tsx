import { Component } from 'react';
import styled from 'styled-components';

const Btn = styled.button<{
	border?: string;
	bgColor?: string;
	color?: string;
}>`
	display: block;
	border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
	color: ${({ color }) => color || '#ffffff'};
	background-color: ${({ bgColor }) => bgColor || '#000000'};
	padding: 0.5rem;
	font-size: 1.1rem;
	flex: 1;
	font-weight: 600;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
`;

interface Props {
	children?: string;
	border?: string;
	bgColor?: string;
	color?: string;
	onClick: (...any: any) => void;
}

class Button extends Component<Props> {
	render() {
		return (
			<Btn {...this.props} type='button' onClick={() => this.props.onClick()}>
				{this.props.children ?? 'Button'}
			</Btn>
		);
	}
}

export default Button;
