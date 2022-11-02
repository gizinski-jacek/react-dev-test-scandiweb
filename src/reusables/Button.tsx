import { Component } from 'react';
import styled from 'styled-components';

interface Props {
	border?: boolean;
	bgColor?: string;
	color?: string;
	children?: string;
}

const Btn = styled.div<Props>`
	border: ${(props) => (props.border ? '1px solid #000000' : 'none')};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	padding: 0.5rem;
	font-size: 1.1rem;
	flex: 1;
	font-weight: 600;
	text-align: center;
`;

class Button extends Component<Props> {
	render() {
		return <Btn {...this.props}>{this.props.children ?? 'Button'}</Btn>;
	}
}

export default Button;
