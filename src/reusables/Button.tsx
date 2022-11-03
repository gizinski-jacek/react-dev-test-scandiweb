import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BtnLinkProps {
	border?: string;
	bgColor?: string;
	color?: string;
}
interface Props extends BtnLinkProps {
	children: string;
	to: string;
}

const BtnLink = styled(Link).attrs((props: BtnLinkProps) => ({
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
`;

class ButtonLink extends Component<Props> {
	render() {
		return (
			<BtnLink {...this.props} to={this.props.to}>
				{this.props.children ?? 'Button'}
			</BtnLink>
		);
	}
}

export default ButtonLink;
