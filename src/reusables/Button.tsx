import { Component } from 'react';
import styled from 'styled-components';

interface BtnProps {
	border?: string;
	bgColor?: string;
	color?: string;
	click: () => void;
}
interface Props extends BtnProps {
	children: string;
}

const Btn = styled.div.attrs((props: BtnProps) => ({
	border: props.border ? `1px solid ${props.border}` : 'none',
	bgColor: props.bgColor || '#000000',
	color: props.color || '#ffffff',
}))`
	border: ${(props) => props.border};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	padding: 0.5rem;
	font-size: 1.1rem;
	flex: 1;
	font-weight: 600;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
`;

class Button extends Component<Props> {
	render() {
		return (
			<Btn {...this.props} onClick={() => this.props.click()}>
				{this.props.children ?? 'Button'}
			</Btn>
		);
	}
}

export default Button;
